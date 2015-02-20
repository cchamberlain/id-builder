"use strict";

var fs = require("fs");
var path = require("path");

var _ = require("lodash");
var async = require("async");
var mkdirp = require("mkdirp");
var preludeLs = require("prelude-ls");
var lsr = require("lsr");
var logging = require("./logging");
var map = preludeLs.map,
    reject = preludeLs.reject,
    filter = preludeLs.filter;

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

var readFile = function (path, cb) {
  fs.readFile(path, function (e, chunk) {
    if (e) {
      return cb(e);
    }

    cb(null, chunk.toString());
  });
};

var writeFile = function (path, string, cb) {
  fs.writeFile(path, string, cb);
};

var ensureFileDirectory = exports.ensureFileDirectory = function (targetFilePath, cb) {
  mkdirp(path.dirname(targetFilePath), cb);
};

var compileFile = exports.compileFile = function (compileChunk) {
  return function (options, sourceFilePath, targetFilePath, cb) {
    readFile(sourceFilePath, function (e, fileContent) {
      if (e) {
        return cb(e);
      }

      compileChunk(options, fileContent, function (e, compiledChunk) {
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

            logging.taskInfo(options.taskName, "" + sourceFilePath + " => " + targetFilePath);

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

      async.each(paths, iteratePath, cb);
    });
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});