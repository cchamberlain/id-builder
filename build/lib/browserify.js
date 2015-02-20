"use strict";

var fs = require("fs");
var path = require("path");

var _ = require("lodash");
var browserify = require("browserify");
var watchify = require("watchify");

var fileSystem = require("./fileSystem");
var logging = require("./logging");

var sourceExtension = exports.sourceExtension = "coffee";
var targetExtension = exports.targetExtension = "js";

// Returns true if the path is the target path.
var pathReloads = exports.pathReloads = function (options, p) {
  return p === global.options.tasks.watchBrowserify.targetPath;
};

// TODO: Find a better way to match paths then just on all writes.. e.g. to
// discern wether a file is in a bundle so a recompile is needed.
var sourceFilePathMatches = exports.sourceFilePathMatches = function (options, sourceFilePath) {
  var resolvedSourceDirectoryPath = path.resolve(options.sourceDirectory);
  var resolvedSourceFilePath = path.resolve(sourceFilePath);
  var resolvedTargetPath = path.resolve(options.targetPath);

  if (resolvedSourceFilePath === resolvedTargetPath) {
    return false;
  } else if (resolvedSourceFilePath.indexOf(resolvedSourceDirectoryPath) === 0) {
    return true;
  } else {
    return false;
  }
};

var compileAllFiles = exports.compileAllFiles = function (options, cb) {
  fs.exists(options.sourcePath, function (exists) {
    if (!exists) {
      logging.taskInfo(options.taskName, "skipping " + options.sourcePath + " (Does not exist)");
      return cb();
    }

    fileSystem.ensureFileDirectory(options.targetPath, function (e) {
      if (e) {
        return cb(e);
      }

      var b = browserify({
        cache: {},
        debug: true,
        fullPaths: true,
        packageCache: {}
      });

      b.transform("reactify");

      b.add(path.resolve(options.sourcePath));

      b.on("bundle", function (bundleStream) {
        var writeStream = fs.createWriteStream(options.targetPath);

        writeStream.on("error", function (e) {
          if (e) {
            return cb(e);
          }
        });

        writeStream.on("finish", function () {
          logging.taskInfo(options.taskName, "" + options.sourcePath + " => " + options.targetPath);
          cb();
        });

        bundleStream.pipe(writeStream);
      });

      b.bundle();
    });
  });
};

var watch = exports.watch = function (options, cb) {
  cb();

  var b = browserify({
    cache: {},
    debug: true,
    fullPaths: true,
    packageCache: {}
  });

  b.transform("reactify");

  b.add(path.resolve(options.sourcePath));

  b.on("bundle", function (bundleStream) {
    var data = "";

    bundleStream.on("data", function (d) {
      data += d;
    });

    bundleStream.on("data", function (d) {
      fs.writeFile(options.targetPath, data, function (e) {
        if (e) {
          return cb(e);
        }

        logging.taskInfo(options.taskName, "" + options.sourcePath + " => " + options.targetPath);
      });
    });
  });

  var w = watchify(b);

  w.on("update", function () {
    b.bundle();
  });

  b.bundle();
};
Object.defineProperty(exports, "__esModule", {
  value: true
});