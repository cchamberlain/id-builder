'use strict';

import _ from 'lodash';
import chokidar from 'chokidar';

import log from './log';

let watcher = null;

const getWatcher = function() {
  return watcher;
};

const start = function(options) {
  log.debug('watch.start');

  // If there are no paths to watch, do nothing.
  if (!options.paths.length) {
    return;
  }

  // If the watcher instance already exists, return it.
  if (watcher) {
    return watcher;
  }

  // Start the watcher with the first path.
  watcher = chokidar.watch(options.paths, {
    atomic: true,
    ignoreInitial: true,
    ignored: /[\/\/]\./,
    persistent: true,
    usePolling: true
  });

  return watcher;
};

export default {
  getWatcher,
  start
};
