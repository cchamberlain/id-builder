'use strict';

import { sourceFilePathMatches, reload } from '../lib/browsersync';
import logging from '../lib/logging';
import { getWatcher } from '../lib/watch';
import { removePath } from '../lib/fileSystem'

const dependencies = [
  'watch'
];

const handleAdd = function(options, path, stat) {
  if (path.match(/\.js$/) && global.options.tasks.watchBrowserify.targetPath !== path) {
    // Only reload if it's the bundle when the file is a JavaScript file.
    return;
  } else if (!sourceFilePathMatches(options, path)) {
    // Only reload when needed if it isn't a js file.
    return;
  }

  reload(options, path, e => {
    if (e) {
      logging.taskError(e);
    }
  });
};

const handleAddDir = function(options, path, stat) {
  if (path.match(/\.js$/) && global.options.tasks.watchBrowserify.targetPath !== path) {
    // Only reload if it's the bundle when the file is a JavaScript file.
    return;
  } else if (!sourceFilePathMatches(options, path)) {
    // Only reload when needed if it isn't a js file.
    return;
  }

  // TODO: Something?
};

const handleChange = function(options, path, stat) {
  logging.debug('watchBrowserSync.handleChange', path, options, stat);

  if (path.match(/\.js$/) && global.options.tasks.watchBrowserify.targetPath !== path) {
    // Only reload if it's the bundle when the file is a JavaScript file.
    return;
  } else if (!sourceFilePathMatches(options, path)) {
    // Only reload when needed if it isn't a js file.
    return;
  }

  logging.debug('watchBrowserSync.handleChange MATCH!!!', path, options, stat);

  reload(options, path, function(e) {
    logging.debug('watchBrowserSync.handleChange RELOADED', path, options, stat);

    if (e) {
      logging.taskError(e);
    }
  });
};

const handleUnlink = function(options, path, stat) {
  if (path.match(/\.js$/) && global.options.tasks.watchBrowserify.targetPath !== path) {
    // Only reload if it's the bundle when the file is a JavaScript file.
    return;
  } else if (!sourceFilePathMatches(options, path)) {
    // Only reload when needed if it isn't a js file.
    return;
  }

  removePath(path, e => {
    if (e) {
      logging.taskError(e);
    }
  });
};

const handleUnlinkDir = function(options, path, stat) {
  if (path.match(/\.js$/) && global.options.tasks.watchBrowserify.targetPath !== path) {
    // Only reload if it's the bundle when the file is a JavaScript file.
    return;
  } else if (!sourceFilePathMatches(options, path)) {
    // Only reload when needed if it isn't a js file.
    return;
  }

  removePath(path, e => {
    if (e) {
      logging.taskError(e);
    }
  });
};

const handleError = function(options, e) {
  logging.taskError(e);
};

const run = function(options, cb) {
  logging.debug('watchBrowsersync.run', options);

  const watcher = getWatcher();

  watcher.on('all', (...args) => {
    logging.debug('watchBrowsersync all: ', ...args);
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
