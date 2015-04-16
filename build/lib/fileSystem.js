'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _readFile$writeFile = require('fs');

var _dirname = require('path');

var _import = require('lodash');

var _import2 = _interopRequireWildcard(_import);

var _lsr = require('lsr');

var _lsr2 = _interopRequireWildcard(_lsr);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireWildcard(_mkdirp);

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireWildcard(_rimraf);

var _each = require('async');

var _log = require('./log');

var _log2 = _interopRequireWildcard(_log);

'use strict';

var removePath = function removePath(path, cb) {
  _rimraf2['default'](path, cb);
};

var getFiles = function getFiles(path, cb) {
  _log2['default'].debug('fileSystem.getFiles', path);

  _lsr2['default'](path, function (e, nodes) {
    if (e) {
      return cb(e);
    }

    cb(null, _import2['default'](nodes).filter(function (v) {
      return v.isFile();
    }));
  });
};

var getDirectories = function getDirectories(path, cb) {
  _log2['default'].debug('fileSystem.getDirectories', path);

  _lsr2['default'](path, function (e, nodes) {
    if (e) {
      return cb(e);
    }

    cb(null, _import2['default'](nodes).filter(function (v) {
      return v.isDirectory();
    }));
  });
};

var getTargetPath = function getTargetPath(sourceDirectory, targetDirectory, sourceExtension, targetExtension, sourcePath) {
  return sourcePath.replace(sourceDirectory, targetDirectory).replace(RegExp('\\.' + sourceExtension + '$'), '.' + targetExtension);
};

var ensureFileDirectory = function ensureFileDirectory(targetFilePath, cb) {
  _log2['default'].debug('fileSystem.ensureFileDirectory', targetFilePath);

  _mkdirp2['default'](_dirname.dirname(targetFilePath), cb);
};

var compileFile = function compileFile(compileChunk) {
  return function (options, sourceFilePath, targetFilePath, cb) {
    _log2['default'].debug('fileSystem.compileFile', sourceFilePath);

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

            _log2['default'].taskInfo(options.taskName, '' + sourceFilePath + ' => ' + targetFilePath);

            cb(null);
          });
        });
      });
    });
  };
};

var compileAllFiles = function compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension) {
  return function (options, cb) {
    _log2['default'].debug('fileSystem.compileAllFiles');

    getFiles(options.sourcePath, function (e, sourceFilePaths) {
      if (e) {
        return cb();
      }

      var paths = _import2['default'](sourceFilePaths).map(function (v) {
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

exports['default'] = {
  compileAllFiles: compileAllFiles,
  compileFile: compileFile,
  ensureFileDirectory: ensureFileDirectory,
  removePath: removePath
};
module.exports = exports['default'];