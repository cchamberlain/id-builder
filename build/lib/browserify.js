'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _exists$createWriteStream$writeFile = require('fs');

var _resolve = require('path');

var _browserify = require('browserify');

var _browserify2 = _interopRequireWildcard(_browserify);

var _watchify = require('watchify');

var _watchify2 = _interopRequireWildcard(_watchify);

var _jadeify = require('jadeify');

var _jadeify2 = _interopRequireWildcard(_jadeify);

var _fileSystem = require('./fileSystem');

var _fileSystem2 = _interopRequireWildcard(_fileSystem);

var _log = require('./log');

var _log2 = _interopRequireWildcard(_log);

'use strict';

var sourceExtension = 'coffee';
var targetExtension = 'js';

// TODO: Find a better way to match paths then just on all writes.. e.g. to
// discern wether a file is in a bundle so a recompile is needed.
var sourceFilePathMatches = function sourceFilePathMatches(options, sourceFilePath) {
  return sourceFilePath !== options.targetFilePath && sourceFilePath.indexOf(options.sourceDirectoryPath) === 0;
};

var getBrowserifyBundle = function getBrowserifyBundle(options) {
  var browserifyOptions = {
    cache: {},
    debug: true,
    fullPaths: true,
    packageCache: {}
  };

  var b = _browserify2['default'](browserifyOptions);

  var jadeRuntime = require.resolve('jade/runtime');

  var jadeifyOptions = {
    compileDebug: true,
    pretty: true,
    runtimePath: jadeRuntime
  };

  b.transform(_jadeify2['default'], jadeifyOptions);

  return b;
};

var compileAllFiles = function compileAllFiles(options, cb) {
  _exists$createWriteStream$writeFile.exists(options.sourceFilePath, function (exists) {
    if (!exists) {
      _log2['default'].taskInfo(options.taskName, 'skipping ' + options.sourceFilePath + ' (Does not exist)');
      return cb();
    }

    _fileSystem2['default'].ensureFileDirectory(options.targetFilePath, function (e) {
      if (e) {
        return cb(e);
      }

      var b = getBrowserifyBundle(options);

      b.add(_resolve.resolve(options.sourceFilePath));

      b.on('bundle', function (bundleStream) {
        var data = '';

        bundleStream.on('data', function (d) {
          data += d;
        });

        bundleStream.on('end', function (d) {
          _exists$createWriteStream$writeFile.writeFile(options.targetFilePath, data, function (e) {
            if (e) {
              return cb(e);
            }

            _log2['default'].taskInfo(options.taskName, '' + options.sourceFilePath + ' => ' + options.targetFilePath);
            cb();
          });
        });
      });

      b.bundle();
    });
  });
};

var watch = function watch(options, cb) {
  _exists$createWriteStream$writeFile.exists(options.sourceFilePath, function (exists) {
    if (!exists) {
      _log2['default'].taskInfo(options.taskName, 'skipping ' + options.sourceFilePath + ' (Does not exist)');
      return cb();
    }

    _fileSystem2['default'].ensureFileDirectory(options.targetFilePath, function (e) {
      if (e) {
        return cb(e);
      }

      var b = getBrowserifyBundle(options);

      b.add(_resolve.resolve(options.sourceFilePath));

      b.on('bundle', function (bundleStream) {
        var data = '';

        bundleStream.on('data', function (d) {
          data += d;
        });

        bundleStream.on('end', function (d) {
          _exists$createWriteStream$writeFile.writeFile(options.targetFilePath, data, function (e) {
            if (e) {
              return cb(e);
            }

            _log2['default'].taskInfo(options.taskName, '' + options.sourceFilePath + ' => ' + options.targetFilePath);
          });
        });
      });

      var w = _watchify2['default'](b);

      w.on('update', function () {
        b.bundle();
      });

      b.bundle();
    });
  });
};

exports['default'] = {
  sourceExtension: sourceExtension,
  targetExtension: targetExtension,
  sourceFilePathMatches: sourceFilePathMatches,
  compileAllFiles: compileAllFiles,
  watch: watch
};
module.exports = exports['default'];