import _ from 'lodash';
import chokidar from 'chokidar';
import log from 'loglevel';

import logging from './logging';

let watcher = null;

function getWatcher()  {
  return watcher;
}

function start(options)  {
  log.debug('lib/watch.start');

  // If there are no paths to watch, do nothing.
  if (!options.paths.length) {
    return;
  }

  // If the watcher instance already exists, return it.
  if (watcher) {
    return watcher;
  }

  log.debug('lib/watch.start: creating watcher');

  // Start the watcher with the first path.
  watcher = chokidar.watch(options.paths, {
    atomic: true,
    ignoreInitial: true,
    //ignored: /[\/\/]\./,
    persistent: true,
    usePolling: true
  });

  log.debug('lib/watch.start: watching paths', options.paths);

  watcher.on('add', (path, stat) => {
    log.debug('lib/watch.start: add', path);
  });
  watcher.on('addDir', (path, stat) => {
    log.debug('lib/watch.start: addDir', path);
  });
  watcher.on('change', (path, stat) => {
    log.debug('lib/watch.start: change', path);
  });
  watcher.on('unlink', (path, stat) => {
    log.debug('lib/watch.start: unlink', path);
  });
  watcher.on('unlinkDir', (path, stat) => {
    log.debug('lib/watch.start: unlinkDir', path);
  });
  watcher.on('error', (path, stat) => {
    log.debug('lib/watch.start: error', path);
  });

  return watcher;
}

export default {
  getWatcher,
  start
};
