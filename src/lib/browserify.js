"use strict";

var fs = require("fs");
var path = require("path");

var browserify = require("browserify");
var watchify = require("watchify");

var fileSystem = require("./fileSystem");
var logging = require("./logging");

var sourceExtension = "coffee";
var targetExtension = "js";

var globalOptions = global.options;

// Returns true if the path is the target path.
var pathReloads = function(options, p) {
  return p === globalOptions.tasks.watchBrowserify.targetPath;
};

// TODO: Find a better way to match paths then just on all writes.. e.g. to
// discern wether a file is in a bundle so a recompile is needed.
var sourceFilePathMatches = function(options, sourceFilePath) {
  var resolvedSourceDirectoryPath = path.resolve(options.sourceDirectory);
  var resolvedSourceFilePath = path.resolve(sourceFilePath);
  var resolvedTargetPath = path.resolve(options.targetPath);

  if (resolvedSourceFilePath === resolvedTargetPath) {
    return false;
  } else if (resolvedSourceFilePath.indexOf(resolvedSourceDirectoryPath) === 0) {
    return true;
  }  else {
    return false;
  }
};

var compileAllFiles = function(options, cb) {
  fs.exists(options.sourcePath, function(exists) {
    if (!exists) {
      logging.taskInfo(options.taskName, `skipping ${options.sourcePath} (Does not exist)`);
      return cb();
    }

    fileSystem.ensureFileDirectory(options.targetPath, function(e) {
      if (e) {
        return cb(e);
      }

      var b = browserify({
        cache: {},
        debug: true,
        fullPaths: true,
        packageCache: {}
      });

      b.transform("reactify")

      b.add(path.resolve(options.sourcePath));

      b.on("bundle", function(bundleStream) {
        var writeStream = fs.create-writeStream(options.targetPath);

        writeStream.on("error", function(e) {
          if (e) {
            return cb(e);
          }
        });

        writeStream.on("finish", function() {
          logging.taskInfo(options.taskName, `${options.sourcePath} => ${options.targetPath}`);
          cb();
        });

        bundleStream
          .pipe(writeStream);
      });

      b.bundle();
    });
  });
};

var watch = function(options, cb) {
  cb();

  var b = browserify({
    cache: {},
    debug: true,
    fullPaths: true,
    packageCache: {}
  });

  b.transform("reactify")

  b.add(path.resolve(options.sourcePath));

  b.on("bundle", function(bundleStream) {
    var data = "";

    bundleStream.on("data", function(d) {
      data += d;
    });

    bundleStream.on("data", function(d) {
      fs.writeFile(options.targetPath, data, function(e) {
        if (e) {
          return cb(e);
        }

        logging.taskInfo(options.taskName, `${options.sourcePath} => ${options.targetPath}`);
      });
    });
  });

  var w = watchify(b);

  w.on("update", function() {
    b.bundle()
  });

  b.bundle();
};

module.exports = {
  sourceExtension: sourceExtension,
  targetExtension: targetExtension,
  pathReloads: pathReloads,
  sourceFilePathMatches: sourceFilePathMatches,
  compileAllFiles: compileAllFiles,
  watch: watch
};