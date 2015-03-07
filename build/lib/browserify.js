"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _fs = require("fs");

var exists = _fs.exists;
var createWriteStream = _fs.createWriteStream;
var writeFile = _fs.writeFile;
var browserify = _interopRequire(require("browserify"));

var watchify = _interopRequire(require("watchify"));

var ensureFileDirectory = require("./fileSystem").ensureFileDirectory;
var log = _interopRequireWildcard(require("./log"));

var sourceExtension = exports.sourceExtension = "coffee";
var targetExtension = exports.targetExtension = "js";

// TODO: Find a better way to match paths then just on all writes.. e.g. to
// discern wether a file is in a bundle so a recompile is needed.
var sourceFilePathMatches = exports.sourceFilePathMatches = function (options, sourceFilePath) {
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

var compileAllFiles = exports.compileAllFiles = function (options, cb) {
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

var watch = exports.watch = function (options, cb) {
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
Object.defineProperty(exports, "__esModule", {
  value: true
});