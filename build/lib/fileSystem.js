"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _fs = require("fs");

var readFile = _fs.readFile;
var writeFile = _fs.writeFile;
var dirname = require("path").dirname;
var _ = _interopRequire(require("lodash"));

var lsr = _interopRequire(require("lsr"));

var mkdirp = _interopRequire(require("mkdirp"));

var each = require("async").each;
var taskInfo = require("./logging").taskInfo;


var getFiles = function (path, cb) {
  lsr(path, function (e, nodes) {
    if (e) {
      return cb(e);
    }

    cb(null, _(nodes).filter(function (v) {
      return v.isFile();
    }));
  });
};

var getDirectories = function (path, cb) {
  lsr(path, function (e, nodes) {
    if (e) {
      return cb(e);
    }

    cb(null, _(nodes).filter(function (v) {
      return v.isDirectory();
    }));
  });
};

var getTargetPath = function (sourceDirectory, targetDirectory, sourceExtension, targetExtension, sourcePath) {
  return sourcePath.replace(sourceDirectory, targetDirectory).replace(RegExp("\\." + sourceExtension + "$"), "." + targetExtension);
};

var ensureFileDirectory = exports.ensureFileDirectory = function (targetFilePath, cb) {
  mkdirp(dirname(targetFilePath), cb);
};

var compileFile = exports.compileFile = function (compileChunk) {
  return function (options, sourceFilePath, targetFilePath, cb) {
    readFile(sourceFilePath, function (e, fileContent) {
      if (e) {
        return cb(e);
      }

      compileChunk(options, fileContent.toString(), function (e, compiledChunk) {
        if (e) {
          return cb(e);
        }

        ensureFileDirectory(targetFilePath, function (e) {
          if (e) {
            return cb(e);
          }

          writeFile(targetFilePath, compiledChunk, function (e) {
            if (e) {
              return cb(e);
            }

            taskInfo(options.taskName, "" + sourceFilePath + " => " + targetFilePath);

            cb(null);
          });
        });
      });
    });
  };
};

var compileAllFiles = exports.compileAllFiles = function (sourceFilePathMatches, compileFile, sourceExtension, targetExtension) {
  return function (options, cb) {
    getFiles(options.sourcePath, function (e, sourceFilePaths) {
      if (e) {
        return cb();
      }

      var paths = _(sourceFilePaths).map(function (v) {
        return v.fullPath;
      }).filter(function (v) {
        return sourceFilePathMatches(options, v);
      }).value();

      var iteratePath = function (currentSourceFilePath, cb) {
        var currentTargetFilePath = getTargetPath(options.sourcePath, options.targetPath, sourceExtension, targetExtension, currentSourceFilePath);

        compileFile(options, currentSourceFilePath, currentTargetFilePath, cb);
      };

      each(paths, iteratePath, cb);
    });
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});