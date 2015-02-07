"use strict";

const fs = require("fs");
const path = require("path");

const _ = require("lodash");
const async = require("async");
const mkdirp = require("mkdirp");
const preludeLs = require("prelude-ls");
const lsr = require("lsr");
const logging = require("./logging");
const map = preludeLs.map, reject = preludeLs.reject, filter = preludeLs.filter;

const getFiles = function(path, cb) {
  lsr(path, function(e, nodes) {
    if (e) {
      return cb(e);
    }

    cb(null, _(nodes).filter(function(v) {
      return v.isFile();
    }));
  });
};

const getDirectories = function(path, cb) {
  lsr(path, function(e, nodes) {
    if (e) {
      return cb(e);
    }

    cb(null, _(nodes).filter(function(v) {
      return v.isDirectory();
    }));
  });
};

const getTargetPath = function(sourceDirectory, targetDirectory, sourceExtension, targetExtension, sourcePath) {
  return sourcePath
    .replace(sourceDirectory, targetDirectory)
    .replace(RegExp("\\." + sourceExtension + "$"), "." + targetExtension);
};

const readFile = function(path, cb) {
  fs.readFile(path, function(e, chunk) {
    if (e) {
      return cb(e);
    }

    cb(null, chunk.toString());
  });
};

const writeFile = function(path, string, cb) {
  fs.writeFile(path, string, cb);
};

const ensureFileDirectory = function(targetFilePath, cb) {
  mkdirp(path.dirname(targetFilePath), cb);
};

const compileFile = function(compileChunk) {
  return function(options, sourceFilePath, targetFilePath, cb) {
    readFile(sourceFilePath, function(e, fileContent) {
      if (e) {
        return cb(e);
      }

      compileChunk(options, fileContent, function(e, compiledChunk) {
        if (e) {
          return cb(e);
        }

        ensureFileDirectory(targetFilePath, function(e) {
          if (e) {
            return cb(e);
          }

          writeFile(targetFilePath, compiledChunk, function(e) {
            if (e) {
              return cb(e);
            }

            logging.taskInfo(options.taskName, `${sourceFilePath} => ${targetFilePath}`);

            cb(null);
          });
        });
      });
    });
  };
};

const compileAllFiles = function(sourceFilePathMatches, compileFile, sourceExtension, targetExtension) {
  return function(options, cb) {
    getFiles(options.sourcePath, function(e, sourceFilePaths) {
      if (e) {
        return cb();
      }

      const paths = _(sourceFilePaths)
        .map(function(v) {
          return v.fullPath;
        })
        .filter(function(v) {
          return sourceFilePathMatches(options, v);
        })

      const iteratePath = function(currentSourceFilePath, cb) {
        const currentTargetFilePath = getTargetPath(options.sourcePath, options.targetPath, sourceExtension, targetExtension, currentSourceFilePath);

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