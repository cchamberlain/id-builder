'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireWildcard(_path);

var _log = require('loglevel');

var _log2 = _interopRequireWildcard(_log);

var _webpack = require('webpack');

var _webpack2 = _interopRequireWildcard(_webpack);

var _browsersync = require('./browsersync');

var _browsersync2 = _interopRequireWildcard(_browsersync);

var _logging = require('./logging');

var _logging2 = _interopRequireWildcard(_logging);

var prepareOptions = function prepareOptions(options) {
  // Make the paths absolute, because webpack needs it to be absolute.
  options.context = _path2['default'].resolve(options.context);
  options.entry = _path2['default'].resolve(options.entry);
  options.output.path = _path2['default'].resolve(options.output.path);

  return options;
};

var matchesTargetPath = function matchesTargetPath(options, path) {
  return path === '' + options.path + '/' + options.filename;
};

var compileAllFiles = function compileAllFiles(options, cb) {
  options.options = prepareOptions(options.options);

  var compiler = _webpack2['default'](options.options);

  compiler.run(function (e, stats) {
    if (e) {
      return cb(e);
    }

    var jsonStats = stats.toJson();

    if (jsonStats.errors.length) {
      return console.error(jsonStats.errors);
    }

    if (jsonStats.warnings.length) {
      return console.error(jsonStats.warnings);
    }

    _logging2['default'].taskInfo(options.taskName, '' + options.options.entry + ' => ' + options.options.output.path + '/' + options.options.output.filename);

    cb();
  });
};

var watchAllFiles = function watchAllFiles(options, cb) {
  options.options = prepareOptions(options.options);

  var compiler = _webpack2['default'](options.options);

  var lastHash = undefined;

  compiler.watch(options.watchOptions, function (e, stats) {
    if (e) {
      return cb(e);
    }

    var jsonStats = stats.toJson();

    if (jsonStats.errors.length) {
      return console.error(jsonStats.errors);
    }

    if (jsonStats.warnings.length) {
      return console.error(jsonStats.warnings);
    }

    if (lastHash) {
      if (lastHash !== stats.hash) {
        lastHash = stats.hash;
        _logging2['default'].taskInfo(options.taskName, '' + options.options.entry + ' => ' + options.options.output.path + '/' + options.options.output.filename);
      }
    } else {
      lastHash = stats.hash;
    }
  });
};

exports['default'] = {
  compileAllFiles: compileAllFiles,
  matchesTargetPath: matchesTargetPath,
  watchAllFiles: watchAllFiles
};
module.exports = exports['default'];