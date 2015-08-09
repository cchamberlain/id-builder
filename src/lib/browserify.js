import { exists, createWriteStream, writeFile } from 'fs';
import { resolve } from 'path';

import browserify from 'browserify';
import jadeify from 'jadeify';
import log from 'loglevel';
import watchify from 'watchify';

import fileSystem from './fileSystem';
import logging from './logging';

const sourceExtension = 'js';
const targetExtension = 'js';

// TODO: Find a better way to match paths then just on all writes.. e.g. to
// discern wether a file is in a bundle so a recompile is needed.
const sourceFilePathMatches = function(options, sourceFilePath) {
  return sourceFilePath !== options.targetFilePath && sourceFilePath.indexOf(options.sourceDirectoryPath) === 0;
};

const matchesTargetPath = function(options, path) {
  return path === options.targetPath;
};

const getBrowserifyBundle = function(options) {
  const browserifyOptions = {
    cache: {},
    //debug: true,
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
  log.debug('lib/browserify.compileAllFiles');

  exists(options.sourceFilePath, exists => {
    if (!exists) {
      logging.taskInfo(options.taskName, `skipping ${options.sourceFilePath} (Does not exist)`);
      return cb();
    }

    fileSystem.ensureFileDirectory(options.targetFilePath, e => {
      if (e) {
        return cb(e);
      }

      const b = getBrowserifyBundle(options);

      b.add(resolve(options.sourceFilePath));

      b.on('bundle', bundleStream => {
        let data = '';

        bundleStream.on('data', d => {
          data += d;
        });

        bundleStream.on('end', d => {
          writeFile(options.targetFilePath, data, e => {
            if (e) {
              return cb(e);
            }

            logging.taskInfo(options.taskName, `${options.sourceFilePath} => ${options.targetFilePath}`);
            cb();
          });
        });
      });

      b.bundle();
    });
  });
};

const watch = function(options, cb) {
  log.debug('lib/browserify.watch');

  exists(options.sourceFilePath, exists => {
    if (!exists) {
      logging.taskInfo(options.taskName, `skipping ${options.sourceFilePath} (Does not exist)`);
      return cb();
    }

    fileSystem.ensureFileDirectory(options.targetFilePath, e => {
      if (e) {
        return cb(e);
      }

      const b = getBrowserifyBundle(options);

      b.add(resolve(options.sourceFilePath));

      b.on('bundle', bundleStream => {
        let data = '';

        bundleStream.on('data', d => {
          data += d;
        });

        bundleStream.on('end', d => {
          writeFile(options.targetFilePath, data, e => {
            if (e) {
              return cb(e);
            }

            logging.taskInfo(options.taskName, `${options.sourceFilePath} => ${options.targetFilePath}`);
          });
        });
      });

      const w = watchify(b);

      w.on('update', () => {
        b.bundle();
      });

      b.bundle();
    });
  });
};

export default {
  compileAllFiles,
  matchesTargetPath,
  sourceExtension,
  sourceFilePathMatches,
  targetExtension,
  watch
};
