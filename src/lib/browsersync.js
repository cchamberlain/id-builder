'use strict';

import browserSync from 'browser-sync';

import copy from './copy';
import log from './log';

const sourceFilePathMatches = copy.sourceFilePathMatches;

const reload = function(options, path, cb) {
  log.debug('browsersync.reload', path);

  browserSync.reload(path);

  log.taskInfo(options.taskName, `Reloaded \`${path}\``);

  cb();
};

const runServer = function(_options, cb) {
  log.debug('browsersync.runServer');

  const options = {
    ui: {
      port: 9001
    },

    port: 9000,
    logLevel: 'silent',
    logFileChanges: false,
  };

  browserSync(options, (e, bs) => {
    if (e) {
      return cb(e);
    }

    cb();
  });
};

export default {
  sourceFilePathMatches,
  reload,
  runServer
};
