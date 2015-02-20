'use strict';

import { resolve } from 'path';

import browserSync from 'browser-sync';

import { taskInfo } from './logging';

export const sourceFilePathMatches = function(options, sourceFilePath) {
  const resolvedSourceFilePath = resolve(sourceFilePath);
  const resolvedSourcePath = resolve(options.sourcePath);

  return (resolvedSourceFilePath.indexOf(resolvedSourcePath)) === 0;
};

export const reload = function(options, updatedPath, cb) {
  browserSync.reload(updatedPath);

  taskInfo(options.taskName, 'Reloaded `#{path}`');

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
