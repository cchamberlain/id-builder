'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _readFile$writeFile = require('fs');

var _dirname = require('path');

var _import = require('lodash');

var _ = _interopRequire(_import);

var _lsr = require('lsr');

var lsr = _interopRequire(_lsr);

var _mkdirp = require('mkdirp');

var mkdirp = _interopRequire(_mkdirp);

var _each = require('async');

var _import2 = require('./log');

var log = _interopRequireWildcard(_import2);

'use strict';

var getFiles = function getFiles(path, cb) {
  log.debug('fileSystem.getFiles', path);

  lsr(path, function (e, nodes) {
    if (e) {
      return cb(e);
    }

    cb(null, _(nodes).filter(function (v) {
      return v.isFile();
    }));
  });
};

var getDirectories = function getDirectories(path, cb) {
  log.debug('fileSystem.getDirectories', path);

  lsr(path, function (e, nodes) {
    if (e) {
      return cb(e);
    }

    cb(null, _(nodes).filter(function (v) {
      return v.isDirectory();
    }));
  });
};

var getTargetPath = function getTargetPath(sourceDirectory, targetDirectory, sourceExtension, targetExtension, sourcePath) {
  return sourcePath.replace(sourceDirectory, targetDirectory).replace(RegExp('\\.' + sourceExtension + '$'), '.' + targetExtension);
};

var ensureFileDirectory = function ensureFileDirectory(targetFilePath, cb) {
  log.debug('fileSystem.ensureFileDirectory', targetFilePath);

  mkdirp(_dirname.dirname(targetFilePath), cb);
};

exports.ensureFileDirectory = ensureFileDirectory;
var compileFile = function compileFile(compileChunk) {
  return function (options, sourceFilePath, targetFilePath, cb) {
    log.debug('fileSystem.compileFile', sourceFilePath);

    _readFile$writeFile.readFile(sourceFilePath, function (e, fileContent) {
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

          _readFile$writeFile.writeFile(targetFilePath, compiledChunk, function (e) {
            if (e) {
              return cb(e);
            }

            log.taskInfo(options.taskName, '' + sourceFilePath + ' => ' + targetFilePath);

            cb(null);
          });
        });
      });
    });
  };
};

exports.compileFile = compileFile;
var compileAllFiles = function compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension) {
  return function (options, cb) {
    log.debug('fileSystem.compileAllFiles');

    getFiles(options.sourcePath, function (e, sourceFilePaths) {
      if (e) {
        return cb();
      }

      var paths = _(sourceFilePaths).map(function (v) {
        return v.fullPath;
      }).filter(function (v) {
        return sourceFilePathMatches(options, v);
      }).value();

      var iteratePath = function iteratePath(currentSourceFilePath, cb) {
        var currentTargetFilePath = getTargetPath(options.sourcePath, options.targetPath, sourceExtension, targetExtension, currentSourceFilePath);

        compileFile(options, currentSourceFilePath, currentTargetFilePath, cb);
      };

      _each.each(paths, iteratePath, cb);
    });
  };
};
exports.compileAllFiles = compileAllFiles;