'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _exists$createWriteStream$writeFile = require('fs');

var _resolve = require('path');

var _browserify = require('browserify');

var _browserify2 = _interopRequireWildcard(_browserify);

var _jadeify = require('jadeify');

var _jadeify2 = _interopRequireWildcard(_jadeify);

var _log = require('loglevel');

var _log2 = _interopRequireWildcard(_log);

var _watchify = require('watchify');

var _watchify2 = _interopRequireWildcard(_watchify);

var _fileSystem = require('./fileSystem');

var _fileSystem2 = _interopRequireWildcard(_fileSystem);

var _logging = require('./logging');

var _logging2 = _interopRequireWildcard(_logging);

var sourceExtension = 'js';
var targetExtension = 'js';

// TODO: Find a better way to match paths then just on all writes.. e.g. to
// discern wether a file is in a bundle so a recompile is needed.
function sourceFilePathMatches(options, sourceFilePath) {
  return sourceFilePath !== options.targetFilePath && sourceFilePath.indexOf(options.sourceDirectoryPath) === 0;
}

function matchesTargetPath(options, path) {
  return path === options.targetPath;
}

function getBrowserifyBundle(options) {
  var browserifyOptions = {
    cache: {},
    //debug: true,
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
}

function compileAllFiles(options, cb) {
  _log2['default'].debug('lib/browserify.compileAllFiles');

  _exists$createWriteStream$writeFile.exists(options.sourceFilePath, function (exists) {
    if (!exists) {
      _logging2['default'].taskInfo(options.taskName, 'skipping ' + options.sourceFilePath + ' (Does not exist)');
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

            _logging2['default'].taskInfo(options.taskName, '' + options.sourceFilePath + ' => ' + options.targetFilePath);
            cb();
          });
        });
      });

      b.bundle();
    });
  });
}

function watch(options, cb) {
  _log2['default'].debug('lib/browserify.watch');

  _exists$createWriteStream$writeFile.exists(options.sourceFilePath, function (exists) {
    if (!exists) {
      _logging2['default'].taskInfo(options.taskName, 'skipping ' + options.sourceFilePath + ' (Does not exist)');
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

            _logging2['default'].taskInfo(options.taskName, '' + options.sourceFilePath + ' => ' + options.targetFilePath);
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
}

exports['default'] = {
  compileAllFiles: compileAllFiles,
  matchesTargetPath: matchesTargetPath,
  sourceExtension: sourceExtension,
  sourceFilePathMatches: sourceFilePathMatches,
  targetExtension: targetExtension,
  watch: watch
};
module.exports = exports['default'];