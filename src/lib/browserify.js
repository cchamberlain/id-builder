'use strict';

const fs = require('fs');
const path = require('path');

const _ = require('lodash');
const browserify = require('browserify');
const watchify = require('watchify');

const fileSystem = require('./fileSystem');
const logging = require('./logging');

const sourceExtension = 'coffee';
const targetExtension = 'js';

// Returns true if the path is the target path.
const pathReloads = function(options, p) {
  return p === global.options.tasks.watchBrowserify.targetPath;
};

// TODO: Find a better way to match paths then just on all writes.. e.g. to
// discern wether a file is in a bundle so a recompile is needed.
const sourceFilePathMatches = function(options, sourceFilePath) {
  const resolvedSourceDirectoryPath = path.resolve(options.sourceDirectory);
  const resolvedSourceFilePath = path.resolve(sourceFilePath);
  const resolvedTargetPath = path.resolve(options.targetPath);

  if (resolvedSourceFilePath === resolvedTargetPath) {
    return false;
  } else if (resolvedSourceFilePath.indexOf(resolvedSourceDirectoryPath) === 0) {
    return true;
  }  else {
    return false;
  }
};

const compileAllFiles = function(options, cb) {
  fs.exists(options.sourcePath, function(exists) {
    if (!exists) {
      logging.taskInfo(options.taskName, `skipping ${options.sourcePath} (Does not exist)`);
      return cb();
    }

    fileSystem.ensureFileDirectory(options.targetPath, function(e) {
      if (e) {
        return cb(e);
      }

      const b = browserify({
        cache: {},
        debug: true,
        fullPaths: true,
        packageCache: {}
      });

      b.transform('reactify')

      b.add(path.resolve(options.sourcePath));

      b.on('bundle', function(bundleStream) {
        const writeStream = fs.createWriteStream(options.targetPath);

        writeStream.on('error', function(e) {
          if (e) {
            return cb(e);
          }
        });

        writeStream.on('finish', function() {
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

const watch = function(options, cb) {
  cb();

  const b = browserify({
    cache: {},
    debug: true,
    fullPaths: true,
    packageCache: {}
  });

  b.transform('reactify')

  b.add(path.resolve(options.sourcePath));

  b.on('bundle', function(bundleStream) {
    let data = '';

    bundleStream.on('data', function(d) {
      data += d;
    });

    bundleStream.on('data', function(d) {
      fs.writeFile(options.targetPath, data, function(e) {
        if (e) {
          return cb(e);
        }

        logging.taskInfo(options.taskName, `${options.sourcePath} => ${options.targetPath}`);
      });
    });
  });

  const w = watchify(b);

  w.on('update', function() {
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
