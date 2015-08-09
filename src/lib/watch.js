import chokidar from 'chokidar';
import log from 'loglevel';

let watcher = null;

function getWatcher() {
  return watcher;
}

function start(options) {
  log.debug('lib/watch.start');

  // If there are no paths to watch, do nothing.
  if (!options.paths.length) {
    return null;
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
    // ignored: /[\/\/]\./,
    persistent: true,
    usePolling: true
  });

  log.debug('lib/watch.start: watching paths', options.paths);

  watcher.on('add', (path) => {
    log.debug('lib/watch.start: add', path);
  });

  watcher.on('addDir', (path) => {
    log.debug('lib/watch.start: addDir', path);
  });

  watcher.on('change', (path) => {
    log.debug('lib/watch.start: change', path);
  });

  watcher.on('unlink', (path) => {
    log.debug('lib/watch.start: unlink', path);
  });

  watcher.on('unlinkDir', (path) => {
    log.debug('lib/watch.start: unlinkDir', path);
  });

  watcher.on('error', (path) => {
    log.debug('lib/watch.start: error', path);
  });

  return watcher;
}

export default {
  getWatcher,
  start
};
