'use strict';

import { exists, createWriteStream, writeFile } from 'fs';
import { resolve } from 'path';

import browserify from 'browserify';
import watchify from 'watchify';
import jadeify from 'jadeify';

import { ensureFileDirectory } from './fileSystem';
import log from './log';

const sourceExtension = 'coffee';
const targetExtension = 'js';

// TODO: Find a better way to match paths then just on all writes.. e.g. to
// discern wether a file is in a bundle so a recompile is needed.
const sourceFilePathMatches = function(options, sourceFilePath) {
  return sourceFilePath !== options.targetPath && sourceFilePath.indexOf(options.sourceDirectory) === 0;
};

const getBrowserifyBundle = function(options) {
  const browserifyOptions = {
    cache: {},
    debug: true,
    fullPaths: true,
    packageCache: {}
  };

  const b = browserify(browserifyOptions);

  const jadeRuntime = require.resolve('jade/runtime');

  const jadeifyOptions = {
    compileDebug: true,
    pretty: true,
    runtimePath: jadeRuntime
  };

  b.transform(jadeify, jadeifyOptions);

  return b;
};

const compileAllFiles = function(options, cb) {
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

      const b = getBrowserifyBundle(options);

      b.add(resolve(options.sourcePath));

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

const watch = function(options, cb) {
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

      const b = getBrowserifyBundle(options);

      b.add(resolve(options.sourcePath));

      b.on('bundle', function(bundleStream) {
        log.debug('browserify.watch on bundle');

        let data = '';

        bundleStream.on('data', function(d) {
          data += d;
        });

        bundleStream.on('end', function(d) {
          log.debug('browserify.watch on bundle end');

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

export default {
  sourceExtension,
  targetExtension,
  sourceFilePathMatches,
  compileAllFiles,
  watch
};
