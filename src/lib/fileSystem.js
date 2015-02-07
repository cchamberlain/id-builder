var fs = require('fs');
var path = require('path');

var async = require('async');
var mkdirp = require('mkdirp');
var preludeLs = require('prelude-ls');
var lsr = require('lsr');
var logging = require("./logging");
var map = preludeLs.map, reject = preludeLs.reject, filter = preludeLs.filter;

var getFiles = function(path, cb) {
  lsr(path, function(error, nodes) {
    if (error) {
      return cb(error);
    }

    var paths = nodes
      .filter(function(v) {
        return v.isFile();
      });

    cb(null, paths);
  });
};

var getDirectories = function(path, cb) {
  lsr(path, function(error, nodes) {
    if (error) {
      return cb(error);
    }

    var paths = nodes
      .filter(function(v) {
        return v.isDirectory();
      });

    cb(null, nodes);
  });
};

var getTargetPath = function(sourceDirectory, targetDirectory, sourceExtension, targetExtension, sourcePath) {
  return sourcePath
    .replace(sourceDirectory, targetDirectory)
    .replace(RegExp('\\.' + sourceExtension + '$'), "." + targetExtension);
};

var readFile = function(path, cb) {
  fs.readFile(path, function(error, chunk) {
    if (error) {
      return cb(error);
    }

    cb(null, chunk.toString());
  });
};

var writeFile = function(path, string, cb) {
  fs.writeFile(path, string, cb);
};

var ensureFileDirectory = function(targetFilePath, cb) {
  mkdirp(path.dirname(targetFilePath), cb);
};

var compileFile = function(compileChunk) {
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

var compileAllFiles = function(sourceFilePathMatches, compileFile, sourceExtension, targetExtension) {
  return function(options, cb) {
    getFiles(options.sourcePath, function(error, sourceFilePaths) {
      if (error) {
        return cb();
      }

      var paths = sourceFilePaths
        .map(function(v) {
          return v.fullPath;
        })
        .filter(function(v) {
          return sourceFilePathMatches(options, v);
        })

      var iteratePath = function(currentSourceFilePath, cb) {
        var currentTargetFilePath = getTargetPath(options.sourcePath, options.targetPath, sourceExtension, targetExtension, currentSourceFilePath);

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