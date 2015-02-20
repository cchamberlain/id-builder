'use strict';

const browserSync = require('browser-sync');

const p = require('path');

const logging = require('./logging');

export const sourceFilePathMatches = function(options, sourceFilePath) {
  const resolvedSourceFilePath = p.resolve(sourceFilePath);
  const resolvedSourcePath      = p.resolve(options.sourcePath);

  return (resolvedSourceFilePath.indexOf(resolvedSourcePath)) === 0;
};

export const reload = function(options, updatedPath, cb) {
  browserSync.reload(updatedPath);

  logging.taskInfo(options.taskName, 'Reloaded `#{path}`');

  cb();
};

export const runServer = function(_options, cb) {
  const options = {
    //files: [],
    //minify: false,
    //open: true,
    //host: 'localhost',
    port: 9001,
    logLevel: 'silent',
    logFileChanges: false,
  };

  browserSync(options, function(e, bs) {
    if (e) {
      return cb(e);
    }

    cb();
  });
};
