'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _readFile$writeFile = require('fs');

var _import = require('lodash');

var _ = _interopRequire(_import);

var _each = require('async');

var _lsr = require('lsr');

var lsr = _interopRequire(_lsr);

var _import2 = require('./babel');

var babel = _interopRequireWildcard(_import2);

var _import3 = require('./browserify');

var browserify = _interopRequireWildcard(_import3);

var _import4 = require('./coffeescript');

var coffeescript = _interopRequireWildcard(_import4);

var _import5 = require('./fileSystem');

var fileSystem = _interopRequireWildcard(_import5);

var _import6 = require('./jade');

var jade = _interopRequireWildcard(_import6);

var _import7 = require('./less');

var less = _interopRequireWildcard(_import7);

var _import8 = require('./livescript');

var livescript = _interopRequireWildcard(_import8);

var _import9 = require('./log');

var log = _interopRequireWildcard(_import9);

var _import10 = require('./stylus');

var stylus = _interopRequireWildcard(_import10);

'use strict';

var sourceFilePathMatches = function sourceFilePathMatches(options, sourceFilePath) {
  var globalOptions = global.options;

  var result = undefined;

  if (browserify.sourceFilePathMatches(globalOptions.tasks.compileBrowserify, sourceFilePath)) {
    result = false;
  } else if (coffeescript.sourceFilePathMatches(globalOptions.tasks.compileCoffeescript, sourceFilePath)) {
    result = false;
  } else if (jade.sourceFilePathMatches(globalOptions.tasks.compileJade, sourceFilePath)) {
    result = false;
  } else if (less.sourceFilePathMatches(globalOptions.tasks.compileLess, sourceFilePath)) {
    result = false;
  } else if (livescript.sourceFilePathMatches(globalOptions.tasks.compileLivescript, sourceFilePath)) {
    result = false;
  } else if (babel.sourceFilePathMatches(globalOptions.tasks.compileBabel, sourceFilePath)) {
    result = false;
  } else if (stylus.sourceFilePathMatches(globalOptions.tasks.compileStylus, sourceFilePath)) {
    result = false;
  } else if (sourceFilePath && !!sourceFilePath.match(RegExp('^' + options.sourcePath))) {
    result = true;
  } else {
    result = false;
  }

  log.debug('copy.sourceFilePathMatches =>', result, sourceFilePath);

  return result;
};

exports.sourceFilePathMatches = sourceFilePathMatches;
var copyFile = function copyFile(options, sourceFilePath, targetFilePath, cb) {
  log.debug('copy.copyFile', sourceFilePath, targetFilePath);

  _readFile$writeFile.readFile(sourceFilePath, function (e, readChunk) {
    if (e) {
      return cb(e);
    }

    fileSystem.ensureFileDirectory(targetFilePath, function (e) {
      if (e) {
        return cb(e);
      }

      _readFile$writeFile.writeFile(targetFilePath, readChunk, function (e) {
        if (e) {
          return cb(e);
        }

        log.taskInfo(options.taskName, '' + sourceFilePath + ' => ' + targetFilePath);

        cb(null);
      });
    });
  });
};

exports.copyFile = copyFile;
var copyAllFiles = function copyAllFiles(options, cb) {
  log.debug('copy.copyAllFiles', options.sourcePath);

  lsr(options.sourcePath, function (e, nodes) {
    if (e) {
      return cb(e);
    }

    var paths = _(nodes).filter(function (v) {
      return !v.isDirectory() && sourceFilePathMatches(options, v.fullPath);
    }).map(function (v) {
      return v.fullPath;
    }).value();

    var iteratePath = function iteratePath(currentSourceDirectoryPath, cb) {
      var currentTargetDirectoryPath = currentSourceDirectoryPath.replace(options.sourcePath, options.targetPath);

      copyFile(options, currentSourceDirectoryPath, currentTargetDirectoryPath, cb);
    };

    _each.each(paths, iteratePath, function (e) {
      if (e) {
        return cb(e);
      }

      cb(null);
    });
  });
};
exports.copyAllFiles = copyAllFiles;