'use strict';

import { exists, createWriteStream, writeFile } from 'fs';

import browserify from 'browserify';
import watchify from 'watchify';

import { ensureFileDirectory } from './fileSystem';
import * as log from './log';

export const sourceExtension = 'coffee';
export const targetExtension = 'js';

// TODO: Find a better way to match paths then just on all writes.. e.g. to
// discern wether a file is in a bundle so a recompile is needed.
export const sourceFilePathMatches = function(options, sourceFilePath) {
  let result;

  if (sourceFilePath === options.targetPath) {
    result = false;
  } else if (sourceFilePath.indexOf(options.sourceDirectory) === 0) {
    result = true;
  }  else {
    result = false;
  }

  log.debug('browserify.sourceFilePathMatches =>', result, sourceFilePath);

  return result;
};

export const compileAllFiles = function(options, cb) {
  log.debug('browserify.compileAllFiles');

  exists(options.sourcePath, function(exists) {
    if (!exists) {
      log.taskInfo(options.taskName, `skipping ${options.sourcePath} (Does not exist)`);
      return cb();
    }

    ensureFileDirectory(options.targetPath, function(e) {
      if (e) {
        return cb(e);
      }

      const b = browserify({
        cache: {},
        debug: true,
        fullPaths: true,
        packageCache: {}
      });

      b.add(options.sourcePath);

      b.on('bundle', function(bundleStream) {
        let data = '';

        bundleStream.on('data', function(d) {
          data += d;
        });

        bundleStream.on('end', function(d) {
          writeFile(options.targetPath, data, function(e) {
            if (e) {
              return cb(e);
            }

            log.taskInfo(options.taskName, `${options.sourcePath} => ${options.targetPath}`);
            cb();
          });
        });
      });

      b.bundle();
    });
  });
};

export const watch = function(options, cb) {
  log.debug('browserify.watch');

  exists(options.sourcePath, function(exists) {
    if (!exists) {
      log.taskInfo(options.taskName, `skipping ${options.sourcePath} (Does not exist)`);
      return cb();
    }

    ensureFileDirectory(options.targetPath, function(e) {
      if (e) {
        return cb(e);
      }
      const b = browserify({
        cache: {},
        debug: true,
        fullPaths: true,
        packageCache: {}
      });

      b.add(options.sourcePath);

      b.on('bundle', function(bundleStream) {
        let data = '';

        bundleStream.on('data', function(d) {
          data += d;
        });

        bundleStream.on('end', function(d) {
          writeFile(options.targetPath, data, function(e) {
            if (e) {
              return cb(e);
            }

            log.taskInfo(options.taskName, `${options.sourcePath} => ${options.targetPath}`);
          });
        });
      });

      const w = watchify(b);

      w.on('update', function() {
        b.bundle()
      });

      b.bundle();
    });
  });
};
