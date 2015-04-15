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

var _ensureFileDirectory = require('./fileSystem');

var _log = require('./log');

var _log2 = _interopRequireWildcard(_log);

'use strict';

var sourceExtension = 'coffee';
var targetExtension = 'js';

// TODO: Find a better way to match paths then just on all writes.. e.g. to
// discern wether a file is in a bundle so a recompile is needed.
var sourceFilePathMatches = function sourceFilePathMatches(options, sourceFilePath) {
  var result = undefined;

  if (sourceFilePath === options.targetPath) {
    result = false;
  } else if (sourceFilePath.indexOf(options.sourceDirectory) === 0) {
    result = true;
  } else {
    result = false;
  }

  return result;
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
  _log2['default'].debug('browserify.compileAllFiles');

  _exists$createWriteStream$writeFile.exists(options.sourcePath, function (exists) {
    if (!exists) {
      _log2['default'].taskInfo(options.taskName, 'skipping ' + options.sourcePath + ' (Does not exist)');
      return cb();
    }

    _ensureFileDirectory.ensureFileDirectory(options.targetPath, function (e) {
      if (e) {
        return cb(e);
      }

      var b = getBrowserifyBundle(options);

      b.add(_resolve.resolve(options.sourcePath));

      b.on('bundle', function (bundleStream) {
        var data = '';

        bundleStream.on('data', function (d) {
          data += d;
        });

        bundleStream.on('end', function (d) {
          _exists$createWriteStream$writeFile.writeFile(options.targetPath, data, function (e) {
            if (e) {
              return cb(e);
            }

            _log2['default'].taskInfo(options.taskName, '' + options.sourcePath + ' => ' + options.targetPath);
            cb();
          });
        });
      });

      b.bundle();
    });
  });
};

var watch = function watch(options, cb) {
  _log2['default'].debug('browserify.watch');

  _exists$createWriteStream$writeFile.exists(options.sourcePath, function (exists) {
    if (!exists) {
      _log2['default'].taskInfo(options.taskName, 'skipping ' + options.sourcePath + ' (Does not exist)');
      return cb();
    }

    _ensureFileDirectory.ensureFileDirectory(options.targetPath, function (e) {
      if (e) {
        return cb(e);
      }

      var b = getBrowserifyBundle(options);

      b.add(_resolve.resolve(options.sourcePath));

      b.on('bundle', function (bundleStream) {
        _log2['default'].debug('browserify.watch on bundle');

        var data = '';

        bundleStream.on('data', function (d) {
          data += d;
        });

        bundleStream.on('end', function (d) {
          _log2['default'].debug('browserify.watch on bundle end');

          _exists$createWriteStream$writeFile.writeFile(options.targetPath, data, function (e) {
            if (e) {
              return cb(e);
            }

            _log2['default'].taskInfo(options.taskName, '' + options.sourcePath + ' => ' + options.targetPath);
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