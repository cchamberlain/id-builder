'use strict';

import _ from 'lodash';
import chokidar from 'chokidar';

let watcher = null;

export const getWatcher = function() {
  return watcher;
};

export const start = function(options) {
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
    ignored: /[\/\/]\./,
    persistent: true,
    ignoreInitial: true,
    usePolling: true
  });

  return watcher;
};
