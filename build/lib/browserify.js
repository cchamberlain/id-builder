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

var _import = require('./log');

var log = _interopRequireWildcard(_import);

'use strict';

var sourceExtension = 'coffee';
exports.sourceExtension = sourceExtension;
var targetExtension = 'js';

exports.targetExtension = targetExtension;
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

  log.debug('browserify.sourceFilePathMatches =>', result, sourceFilePath);

  return result;
};

exports.sourceFilePathMatches = sourceFilePathMatches;
var compileAllFiles = function compileAllFiles(options, cb) {
  log.debug('browserify.compileAllFiles');

  _exists$createWriteStream$writeFile.exists(options.sourcePath, function (exists) {
    if (!exists) {
      log.taskInfo(options.taskName, 'skipping ' + options.sourcePath + ' (Does not exist)');
      return cb();
    }

    _ensureFileDirectory.ensureFileDirectory(options.targetPath, function (e) {
      if (e) {
        return cb(e);
      }

      var b = _browserify2['default']({
        cache: {},
        debug: true,
        fullPaths: true,
        packageCache: {}
      });

      b.transform(_jadeify2['default']);

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

            log.taskInfo(options.taskName, '' + options.sourcePath + ' => ' + options.targetPath);
            cb();
          });
        });
      });

      b.bundle();
    });
  });
};

exports.compileAllFiles = compileAllFiles;
var watch = function watch(options, cb) {
  log.debug('browserify.watch');

  _exists$createWriteStream$writeFile.exists(options.sourcePath, function (exists) {
    if (!exists) {
      log.taskInfo(options.taskName, 'skipping ' + options.sourcePath + ' (Does not exist)');
      return cb();
    }

    _ensureFileDirectory.ensureFileDirectory(options.targetPath, function (e) {
      if (e) {
        return cb(e);
      }
      var b = _browserify2['default']({
        cache: {},
        debug: true,
        fullPaths: true,
        packageCache: {}
      });

      b.transform(_jadeify2['default']);

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

            log.taskInfo(options.taskName, '' + options.sourcePath + ' => ' + options.targetPath);
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
exports.watch = watch;