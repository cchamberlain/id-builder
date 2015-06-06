'use strict';

import log from 'loglevel';

import browserify from '../lib/browserify';
import browsersync from '../lib/browsersync';
import fileSystem from '../lib/fileSystem'
import logging from '../lib/logging';
import watch from '../lib/watch';
import webpack from '../lib/webpack';

const dependencies = [
  'watch'
];

const shouldContinue = function(options, path, stat) {
  let result = false;

  if (path.match(/\.js$/) && browserify.matchesTargetPath(options, path) || webpack.matchesTargetPath(options, path)) {
    result = true;
  } else if (browsersync.sourceFilePathMatches(options, path)) {
    result = true;
  }

  return result;
};

const handleAdd = function(options, path, stat) {
  if (!shouldContinue(options, path, stat)) {
    return;
  }

  browsersync.reload(options, path, e => {
    if (e) {
      logging.taskError(e);
    }
  });
};

const handleAddDir = function(options, path, stat) {
  if (!shouldContinue(options, path, stat)) {
    return;
  }

  // TODO: Something?
};

const handleChange = function(options, path, stat) {
  if (!shouldContinue(options, path, stat)) {
    return;
  }

  browsersync.reload(options, path, function(e) {
    if (e) {
      logging.taskError(e);
    }
  });
};

const handleUnlink = function(options, path, stat) {
  if (!shouldContinue(options, path, stat)) {
    return;
  }

  fileSystem.removePath(path, e => {
    if (e) {
      logging.taskError(e);
    }
  });
};

const handleUnlinkDir = function(options, path, stat) {
  if (!shouldContinue(options, path, stat)) {
    return;
  }

  fileSystem.removePath(path, e => {
    if (e) {
      logging.taskError(e);
    }
  });
};

const handleError = function(options, e) {
  logging.taskError(e);
};

const run = function(options, cb) {
  const watcher = watch.getWatcher();

  watcher.on('all', () => {
    log.debug('watchBrowsersync watcher all', arguments);
  });

  watcher.on('ready', () => {
    watcher.on('add', (path, stat) => { handleAdd(options, path, stat); });
    watcher.on('addDir', (path, stat) => { handleAddDir(options, path, stat); });
    watcher.on('change', (path, stat) => { handleChange(options, path, stat); });
    watcher.on('unlink', (path, stat) => { handleUnlink(options, path, stat); });
    watcher.on('unlinkDir', (path, stat) => { handleUnlinkDir(options, path, stat); });
    watcher.on('error', (path, stat) => { handleError(options, path, stat); });
  });
};

export default {
  dependencies,
  run
};
