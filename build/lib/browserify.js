"use strict";

let fs = require("fs");
let path = require("path");

let browserify = require("browserify");
let watchify = require("watchify");

let fileSystem = require("./fileSystem");
let logging = require("./logging");

let sourceExtension = "coffee";
let targetExtension = "js";

let globalOptions = global.options;

// Returns true if the path is the target path.
let pathReloads = function(options, p) {
  return p === globalOptions.tasks.watchBrowserify.targetPath;
};

// TODO: Find a better way to match paths then just on all writes.. e.g. to
// discern wether a file is in a bundle so a recompile is needed.
let sourceFilePathMatches = function(options, sourceFilePath) {
  let resolvedSourceDirectoryPath = path.resolve(options.sourceDirectory);
  let resolvedSourceFilePath = path.resolve(sourceFilePath);
  let resolvedTargetPath = path.resolve(options.targetPath);

  if (resolvedSourceFilePath === resolvedTargetPath) {
    return false;
  } else if (resolvedSourceFilePath.indexOf(resolvedSourceDirectoryPath) === 0) {
    return true;
  }  else {
    return false;
  }
};

let compileAllFiles = function(options, cb) {
  fs.exists(options.sourcePath, function(exists) {
    if (!exists) {
      logging.taskInfo(options.taskName, `skipping ${options.sourcePath} (Does not exist)`);
      return cb();
    }

    fileSystem.ensureFileDirectory(options.targetPath, function(e) {
      if (e) {
        return cb(e);
      }

      let b = browserify({
        cache: {},
        debug: true,
        fullPaths: true,
        packageCache: {}
      });

      b.transform("reactify")

      b.add(path.resolve(options.sourcePath));

      b.on("bundle", function(bundleStream) {
        let writeStream = fs.create-writeStream(options.targetPath);

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

let watch = function(options, cb) {
  cb();

  let b = browserify({
    cache: {},
    debug: true,
    fullPaths: true,
    packageCache: {}
  });

  b.transform("reactify")

  b.add(path.resolve(options.sourcePath));

  b.on("bundle", function(bundleStream) {
    let data = "";

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

  let w = watchify(b);

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