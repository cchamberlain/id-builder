'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireWildcard(_fs);

var _import = require('lodash');

var _import2 = _interopRequireWildcard(_import);

var _async = require('async');

var _async2 = _interopRequireWildcard(_async);

var _log = require('loglevel');

var _log2 = _interopRequireWildcard(_log);

var _lsr = require('lsr');

var _lsr2 = _interopRequireWildcard(_lsr);

var _babel = require('./babel');

var _babel2 = _interopRequireWildcard(_babel);

var _browserify = require('./browserify');

var _browserify2 = _interopRequireWildcard(_browserify);

var _coffeescript = require('./coffeescript');

var _coffeescript2 = _interopRequireWildcard(_coffeescript);

var _fileSystem = require('./fileSystem');

var _fileSystem2 = _interopRequireWildcard(_fileSystem);

var _less = require('./less');

var _less2 = _interopRequireWildcard(_less);

var _livescript = require('./livescript');

var _livescript2 = _interopRequireWildcard(_livescript);

var _logging = require('./logging');

var _logging2 = _interopRequireWildcard(_logging);

var _stylus = require('./stylus');

var _stylus2 = _interopRequireWildcard(_stylus);

var sourceFilePathMatches = function sourceFilePathMatches(options, sourceFilePath) {
  var globalOptions = global.options;

  var result = undefined;

  if (_browserify2['default'].sourceFilePathMatches(globalOptions.tasks.compileBrowserify, sourceFilePath)) {
    result = false;
  } else if (_coffeescript2['default'].sourceFilePathMatches(globalOptions.tasks.compileCoffeescript, sourceFilePath)) {
    result = false;
  } else if (_less2['default'].sourceFilePathMatches(globalOptions.tasks.compileLess, sourceFilePath)) {
    result = false;
  } else if (_livescript2['default'].sourceFilePathMatches(globalOptions.tasks.compileLivescript, sourceFilePath)) {
    result = false;
  } else if (_babel2['default'].sourceFilePathMatches(globalOptions.tasks.compileBabel, sourceFilePath)) {
    result = false;
  } else if (_stylus2['default'].sourceFilePathMatches(globalOptions.tasks.compileStylus, sourceFilePath)) {
    result = false;
  } else if (sourceFilePath && !!sourceFilePath.match(new RegExp('^' + options.sourceDirectoryPath))) {
    result = true;
  } else {
    result = false;
  }

  return result;
};

var copyFile = function copyFile(options, sourceFilePath, targetFilePath, cb) {
  _log2['default'].debug('lib/fileSystem.compileFile', sourceFilePath);

  _fs2['default'].readFile(sourceFilePath, function (e, readChunk) {
    if (e) {
      return cb(e);
    }

    _fileSystem2['default'].ensureFileDirectory(targetFilePath, function (e) {
      if (e) {
        return cb(e);
      }

      _fs2['default'].writeFile(targetFilePath, readChunk, function (e) {
        if (e) {
          return cb(e);
        }

        _logging2['default'].taskInfo(options.taskName, '' + sourceFilePath + ' => ' + targetFilePath);

        cb(null);
      });
    });
  });
};

var copyAllFiles = function copyAllFiles(options, cb) {
  _log2['default'].debug('lib/fileSystem.copyAllFiles');

  _lsr2['default'](options.sourceDirectoryPath, function (e, nodes) {
    if (e) {
      return cb(e);
    }

    var paths = _import2['default'](nodes).filter(function (v) {
      return !v.isDirectory() && sourceFilePathMatches(options, v.fullPath);
    }).map(function (v) {
      return v.fullPath;
    }).value();

    var iteratePath = function iteratePath(currentSourceDirectoryPath, cb) {
      var currentTargetDirectoryPath = currentSourceDirectoryPath.replace(options.sourceDirectoryPath, options.targetDirectoryPath);

      copyFile(options, currentSourceDirectoryPath, currentTargetDirectoryPath, cb);
    };

    _async2['default'].each(paths, iteratePath, function (e) {
      if (e) {
        return cb(e);
      }

      cb(null);
    });
  });
};

exports['default'] = {
  sourceFilePathMatches: sourceFilePathMatches,
  copyFile: copyFile,
  copyAllFiles: copyAllFiles
};
module.exports = exports['default'];