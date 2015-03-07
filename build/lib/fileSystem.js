"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _fs = require("fs");

var readFile = _fs.readFile;
var writeFile = _fs.writeFile;
var dirname = require("path").dirname;
var _ = _interopRequire(require("lodash"));

var lsr = _interopRequire(require("lsr"));

var mkdirp = _interopRequire(require("mkdirp"));

var each = require("async").each;
var log = _interopRequireWildcard(require("./log"));

var getFiles = function (path, cb) {
  log.debug("fileSystem.getFiles", path);

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
  log.debug("fileSystem.getDirectories", path);

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
  log.debug("fileSystem.ensureFileDirectory", targetFilePath);

  mkdirp(dirname(targetFilePath), cb);
};

var compileFile = exports.compileFile = function (compileChunk) {
  return function (options, sourceFilePath, targetFilePath, cb) {
    log.debug("fileSystem.compileFile", sourceFilePath);

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

            log.taskInfo(options.taskName, "" + sourceFilePath + " => " + targetFilePath);

            cb(null);
          });
        });
      });
    });
  };
};

var compileAllFiles = exports.compileAllFiles = function (sourceFilePathMatches, compileFile, sourceExtension, targetExtension) {
  return function (options, cb) {
    log.debug("fileSystem.compileAllFiles");

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