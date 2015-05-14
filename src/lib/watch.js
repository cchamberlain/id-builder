'use strict';

import _ from 'lodash';
import chokidar from 'chokidar';
import log from 'loglevel';

import logging from './logging';

let watcher = null;

const getWatcher = function() {
  return watcher;
};

const start = function(options) {
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

  watcher.on('all', (...args) => {
    log.debug('lib/watch.start: watch all: ', ...args);
  });

  return watcher;
};

export default {
  getWatcher,
  start
};
