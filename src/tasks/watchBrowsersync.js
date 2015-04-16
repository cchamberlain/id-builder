'use strict';

import { sourceFilePathMatches, reload } from '../lib/browsersync';
import log from 'loglevel';
import { getWatcher } from '../lib/watch';
import { removePath } from '../lib/fileSystem'

const dependencies = [
  'watch'
]

const matches = path => {
  if (path.match(/\.js$/) && global.options.tasks.watchBrowserify.targetPath !== path) {
    // Only reload if it's the bundle when the file is a JavaScript file.
    return;
  } else if (!sourceFilePathMatches(options, path)) {
    // Only reload when needed if it isn't a js file.
    return;
  }
};

const handleAdd = (options, path, stat) => {
  if (!matches(path)) {
    return;
  }

  reload(options, path, (e) => {
    if (e) {
      console.error(e);
    }
  });
};

const handleAddDir = (options, path, stat) => {
  if (!matches(path)) {
    return;
  }
};

const handleChange = (options, path, stat) => {
  if (!matches(path)) {
    return;
  }

  reload(options, path, (e) => {
    if (e) {
      console.error(e);
    }
  });
};

const handleUnlink = (options, path, stat) => {
  if (!matches(path)) {
    return;
  }

  removePath(path, e => {
    if (e) {
      log.error(e);
    }
  });
};

const handleUnlinkDir = (options, path, stat) => {
  if (!matches(path)) {
    return;
  }

  removePath(path, e => {
    if (e) {
      log.error(e);
    }
  });
};

const handleError = (options, e) => {
  if (!matches(path)) {
    return;
  }

  log.error(e);
};

const run = (options, cb) => {
  const watcher = getWatcher();

  watcher.on('ready', function() {
    watcher.on('add', (path, stat) => { handleAdd(options, path, stat) });
    watcher.on('addDir', (path, stat) => { handleAddDir(options, path, stat) });
    watcher.on('change', (path, stat) => { handleChange(options, path, stat) });
    watcher.on('unlink', (path, stat) => { handleUnlink(options, path, stat) });
    watcher.on('unlinkDir', (path, stat) => { handleUnlinkDir(options, path, stat) });
    watcher.on('error', (path, stat) => { handleError(options, path, stat) });
  });
};

export default {
  dependencies,
  run
};
