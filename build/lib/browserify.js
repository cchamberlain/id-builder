"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _fs = require("fs");

var exists = _fs.exists;
var createWriteStream = _fs.createWriteStream;
var writeFile = _fs.writeFile;
var resolve = require("path").resolve;
var browserify = _interopRequire(require("browserify"));

var watchify = _interopRequire(require("watchify"));

var ensureFileDirectory = require("./fileSystem").ensureFileDirectory;
var taskInfo = require("./logging").taskInfo;
var sourceExtension = exports.sourceExtension = "coffee";
var targetExtension = exports.targetExtension = "js";

// Returns true if the path is the target
var pathReloads = exports.pathReloads = function (options, p) {
  return p === global.options.tasks.watchBrowserify.targetPath;
};

// TODO: Find a better way to match paths then just on all writes.. e.g. to
// discern wether a file is in a bundle so a recompile is needed.
var sourceFilePathMatches = exports.sourceFilePathMatches = function (options, sourceFilePath) {
  var resolvedSourceDirectoryPath = resolve(options.sourceDirectory);
  var resolvedSourceFilePath = resolve(sourceFilePath);
  var resolvedTargetPath = resolve(options.targetPath);

  if (resolvedSourceFilePath === resolvedTargetPath) {
    return false;
  } else if (resolvedSourceFilePath.indexOf(resolvedSourceDirectoryPath) === 0) {
    return true;
  } else {
    return false;
  }
};

var compileAllFiles = exports.compileAllFiles = function (options, cb) {
  exists(options.sourcePath, function (exists) {
    if (!exists) {
      taskInfo(options.taskName, "skipping " + options.sourcePath + " (Does not exist)");
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

      b.transform("reactify");

      b.add(resolve(options.sourcePath));

      b.on("bundle", function (bundleStream) {
        var writeStream = createWriteStream(options.targetPath);

        writeStream.on("error", function (e) {
          if (e) {
            return cb(e);
          }
        });

        writeStream.on("finish", function () {
          taskInfo(options.taskName, "" + options.sourcePath + " => " + options.targetPath);
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

  b.add(resolve(options.sourcePath));

  b.on("bundle", function (bundleStream) {
    var data = "";

    bundleStream.on("data", function (d) {
      data += d;
    });

    bundleStream.on("data", function (d) {
      writeFile(options.targetPath, data, function (e) {
        if (e) {
          return cb(e);
        }

        taskInfo(options.taskName, "" + options.sourcePath + " => " + options.targetPath);
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