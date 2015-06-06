'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireWildcard(_fs);

var _path = require('path');

var _path2 = _interopRequireWildcard(_path);

var _import = require('lodash');

var _import2 = _interopRequireWildcard(_import);

var _async = require('async');

var _async2 = _interopRequireWildcard(_async);

var _log = require('loglevel');

var _log2 = _interopRequireWildcard(_log);

var _lsr = require('lsr');

var _lsr2 = _interopRequireWildcard(_lsr);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireWildcard(_mkdirp);

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireWildcard(_rimraf);

var _logging = require('./logging');

var _logging2 = _interopRequireWildcard(_logging);

'use strict';

var removePath = _rimraf2['default'];

var getFiles = function getFiles(path, cb) {
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
  _lsr2['default'](path, function (e, nodes) {
    if (e) {
      return cb(e);
    }

    cb(null, _import2['default'](nodes).filter(function (v) {
      return v.isDirectory();
    }));
  });
};

var getTargetPath = function getTargetPath(sourceDirectoryPath, targetDirectoryPath, sourceExtension, targetExtension, sourceFilePath) {
  return sourceFilePath.replace(sourceDirectoryPath, targetDirectoryPath).replace(new RegExp('\\.' + sourceExtension + '$'), '.' + targetExtension);
};

var ensureFileDirectory = function ensureFileDirectory(targetFilePath, cb) {
  _mkdirp2['default'](_path2['default'].dirname(targetFilePath), cb);
};

var compileFile = function compileFile(compileChunk, options, sourceFilePath, targetFilePath, cb) {
  _log2['default'].debug('lib/fileSystem.compileFile', sourceFilePath);

  _fs2['default'].readFile(sourceFilePath, function (e, fileContent) {
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

        _fs2['default'].writeFile(targetFilePath, compiledChunk, function (e) {
          if (e) {
            return cb(e);
          }

          _logging2['default'].taskInfo(options.taskName, '' + sourceFilePath + ' => ' + targetFilePath);

          cb(null);
        });
      });
    });
  });
};

var compileAllFiles = function compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension, options, cb) {
  _log2['default'].debug('lib/fileSystem.compileAllFiles');

  getFiles(options.sourceDirectoryPath, function (e, sourceFilePaths) {
    if (e) {
      return cb();
    }

    var paths = _import2['default'](sourceFilePaths).map(function (v) {
      return v.fullPath;
    }).filter(function (v) {
      return sourceFilePathMatches(options, v);
    }).value();

    var iteratePath = function iteratePath(currentSourceFilePath, cb) {
      var currentTargetFilePath = getTargetPath(options.sourceDirectoryPath, options.targetDirectoryPath, sourceExtension, targetExtension, currentSourceFilePath);

      compileFile(options, currentSourceFilePath, currentTargetFilePath, cb);
    };

    _async2['default'].each(paths, iteratePath, cb);
  });
};

exports['default'] = {
  compileAllFiles: compileAllFiles,
  compileFile: compileFile,
  ensureFileDirectory: ensureFileDirectory,
  removePath: removePath
};
module.exports = exports['default'];