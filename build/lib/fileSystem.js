"use strict";

let fs = require("fs");
let path = require("path");

let async = require("async");
let mkdirp = require("mkdirp");
let preludeLs = require("prelude-ls");
let lsr = require("lsr");
let logging = require("./logging");
let map = preludeLs.map, reject = preludeLs.reject, filter = preludeLs.filter;

let getFiles = function(path, cb) {
  lsr(path, function(error, nodes) {
    if (error) {
      return cb(error);
    }

    let paths = nodes
      .filter(function(v) {
        return v.isFile();
      });

    cb(null, paths);
  });
};

let getDirectories = function(path, cb) {
  lsr(path, function(error, nodes) {
    if (error) {
      return cb(error);
    }

    let paths = nodes
      .filter(function(v) {
        return v.isDirectory();
      });

    cb(null, nodes);
  });
};

let getTargetPath = function(sourceDirectory, targetDirectory, sourceExtension, targetExtension, sourcePath) {
  return sourcePath
    .replace(sourceDirectory, targetDirectory)
    .replace(RegExp("\\." + sourceExtension + "$"), "." + targetExtension);
};

let readFile = function(path, cb) {
  fs.readFile(path, function(error, chunk) {
    if (error) {
      return cb(error);
    }

    cb(null, chunk.toString());
  });
};

let writeFile = function(path, string, cb) {
  fs.writeFile(path, string, cb);
};

let ensureFileDirectory = function(targetFilePath, cb) {
  mkdirp(path.dirname(targetFilePath), cb);
};

let compileFile = function(compileChunk) {
  return function(options, sourceFilePath, targetFilePath, cb) {
    readFile(sourceFilePath, function(error, fileContent) {
      if (error) {
        return cb(error);
      }

      compileChunk(options, fileContent, function(error, compiledChunk) {
        if (error) {
          return cb(error);
        }

        ensureFileDirectory(targetFilePath, function(error) {
          if (error) {
            return cb(error);
          }

          writeFile(targetFilePath, compiledChunk, function(error) {
            if (error) {
              return cb(error);
            }

            logging.taskInfo(options.taskName, `${sourceFilePath} => ${targetFilePath}`);

            cb(null);
          });
        });
      });
    });
  };
};

let compileAllFiles = function(sourceFilePathMatches, compileFile, sourceExtension, targetExtension) {
  return function(options, cb) {
    getFiles(options.sourcePath, function(error, sourceFilePaths) {
      if (error) {
        return cb();
      }

      let paths = sourceFilePaths
        .map(function(v) {
          return v.fullPath;
        })
        .filter(function(v) {
          return sourceFilePathMatches(options, v);
        })

      let iteratePath = function(currentSourceFilePath, cb) {
        let currentTargetFilePath = getTargetPath(options.sourcePath, options.targetPath, sourceExtension, targetExtension, currentSourceFilePath);

        compileFile(options, currentSourceFilePath, currentTargetFilePath, cb);
      };

      async.each(paths, iteratePath, cb);
    });
  };
};

module.exports = {
  compileAllFiles: compileAllFiles,
  compileFile: compileFile,
  ensureFileDirectory: ensureFileDirectory
};