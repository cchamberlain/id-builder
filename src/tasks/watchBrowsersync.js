import log from 'loglevel';

import browserify from '../lib/browserify';
import browsersync from '../lib/browsersync';
import fileSystem from '../lib/fileSystem';
import logging from '../lib/logging';
import watch from '../lib/watch';
import webpack from '../lib/webpack';

const dependencies = [
  'watch'
];

function shouldContinue(options, path) {
  let result = false;

  if (path.match(/\.js$/) && browserify.matchesTargetPath(options, path) || webpack.matchesTargetPath(options, path)) {
    result = true;
  } else if (browsersync.sourceFilePathMatches(options, path)) {
    result = true;
  }

  return result;
}

function handleAdd(options, path) {
  if (!shouldContinue(options, path)) {
    return;
  }

  browsersync.reload(options, path, e => {
    if (e) {
      logging.taskError(e);
    }
  });
}

function handleAddDir(options, path) {
  if (!shouldContinue(options, path)) {
    return;
  }

  // TODO: Something?
}

function handleChange(options, path) {
  if (!shouldContinue(options, path)) {
    return;
  }

  browsersync.reload(options, path, function(e) {
    if (e) {
      logging.taskError(e);
    }
  });
}

function handleUnlink(options, path) {
  if (!shouldContinue(options, path)) {
    return;
  }

  fileSystem.removePath(path, e => {
    if (e) {
      logging.taskError(e);
    }
  });
}

function handleUnlinkDir(options, path) {
  if (!shouldContinue(options, path)) {
    return;
  }

  fileSystem.removePath(path, e => {
    if (e) {
      logging.taskError(e);
    }
  });
}

function handleError(options, e) {
  logging.taskError(e);
}

function run(options) {
  const watcher = watch.getWatcher();

  watcher.on('all', () => {
    log.debug('watchBrowsersync watcher all', arguments);
  });

  watcher.on('ready', () => {
    watcher.on('add', (path) => { handleAdd(options, path); });
    watcher.on('addDir', (path) => { handleAddDir(options, path); });
    watcher.on('change', (path) => { handleChange(options, path); });
    watcher.on('unlink', (path) => { handleUnlink(options, path); });
    watcher.on('unlinkDir', (path) => { handleUnlinkDir(options, path); });
    watcher.on('error', (path) => { handleError(options, path); });
  });
}

export default {
  dependencies,
  run
};
