"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
"use strict";

var _fs = require("fs");

var exists = _fs.exists;
var createWriteStream = _fs.createWriteStream;
var writeFile = _fs.writeFile;

var browserify = _interopRequire(require("browserify"));

var watchify = _interopRequire(require("watchify"));

var ensureFileDirectory = require("./fileSystem").ensureFileDirectory;

var log = _interopRequireWildcard(require("./log"));

var sourceExtension = "coffee";
exports.sourceExtension = sourceExtension;
var targetExtension = "js";

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

  log.debug("browserify.sourceFilePathMatches =>", result, sourceFilePath);

  return result;
};

exports.sourceFilePathMatches = sourceFilePathMatches;
var compileAllFiles = function compileAllFiles(options, cb) {
  log.debug("browserify.compileAllFiles");

  exists(options.sourcePath, function (exists) {
    if (!exists) {
      log.taskInfo(options.taskName, "skipping " + options.sourcePath + " (Does not exist)");
      return cb();
    }

    ensureFileDirectory(options.targetPath, function (e) {
      if (e) {
        return cb(e);
      }

      var b = browserify({
        cache: {},
        debug: true,
        fullPaths: true,
        packageCache: {}
      });

      b.add(options.sourcePath);

      b.on("bundle", function (bundleStream) {
        var data = "";

        bundleStream.on("data", function (d) {
          data += d;
        });

        bundleStream.on("end", function (d) {
          writeFile(options.targetPath, data, function (e) {
            if (e) {
              return cb(e);
            }

            log.taskInfo(options.taskName, "" + options.sourcePath + " => " + options.targetPath);
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
  log.debug("browserify.watch");

  exists(options.sourcePath, function (exists) {
    if (!exists) {
      log.taskInfo(options.taskName, "skipping " + options.sourcePath + " (Does not exist)");
      return cb();
    }

    ensureFileDirectory(options.targetPath, function (e) {
      if (e) {
        return cb(e);
      }
      var b = browserify({
        cache: {},
        debug: true,
        fullPaths: true,
        packageCache: {}
      });

      b.add(options.sourcePath);

      b.on("bundle", function (bundleStream) {
        var data = "";

        bundleStream.on("data", function (d) {
          data += d;
        });

        bundleStream.on("end", function (d) {
          writeFile(options.targetPath, data, function (e) {
            if (e) {
              return cb(e);
            }

            log.taskInfo(options.taskName, "" + options.sourcePath + " => " + options.targetPath);
          });
        });
      });

      var w = watchify(b);

      w.on("update", function () {
        b.bundle();
      });

      b.bundle();
    });
  });
};
exports.watch = watch;