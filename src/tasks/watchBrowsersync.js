'use strict';

import log from 'loglevel';
import { sourceFilePathMatches, reload } from '../lib/browsersync';
import { getWatcher } from '../lib/watch';

const dependencies = [
  'runBrowsersyncServer',
  'watch'
];

const handlePath = function(options, path, stat) {
  log.debug('watchBrowsersync.handlePath', path);

  // Only reload if it's the bundle when the file is a JavaScript file.
  if (path.match(/\.js$/)) {
    if (global.options.tasks.watchBrowserify.targetPath !== path) {
      return;
    }
  }

  if (!sourceFilePathMatches(options, path)) {
    return;
  }

  reload(options, path, function(e) {
    if (e) {
      console.error(e);
    }
  });
};

const handleAdd = function(options, path, stat) {
  handlePath(options, path, stat);
};

const handleAddDir = function(options, path, stat) {
};

const handleChange = function(options, path, stat) {
  handlePath(options, path, stat);
};

const handleUnlink = function(options, path, stat) {
};

const handleUnlinkDir = function(options, path, stat) {
};

const handleError = function(options, e) {
};

const run = function(options, cb) {
  const watcher = getWatcher();

  watcher.on('ready', function() {
    watcher.on('add', function(path, stat) { handleAdd(options, path, stat) });
    watcher.on('addDir', function(path, stat) { handleAddDir(options, path, stat) });
    watcher.on('change', function(path, stat) { handleChange(options, path, stat) });
    watcher.on('unlink', function(path, stat) { handleUnlink(options, path, stat) });
    watcher.on('unlinkDir', function(path, stat) { handleUnlinkDir(options, path, stat) });
    watcher.on('error', function(path, stat) { handleError(options, path, stat) });
  });
};

export default {
  dependencies,
  run
};
