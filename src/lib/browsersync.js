'use strict';

import browserSync from 'browser-sync';

import * as copy from './copy';
import * as log from './log';

export const sourceFilePathMatches = copy.sourceFilePathMatches;

export const reload = function(options, path, cb) {
  log.debug('browsersync.reload', path);

  browserSync.reload(path);

  log.taskInfo(options.taskName, `Reloaded \`${path}\``);

  cb();
};

export const runServer = function(_options, cb) {
  log.debug('browsersync.runServer');

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
