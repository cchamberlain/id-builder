'use strict';

import { buildFilePathMatches, runTests } from '../lib/tests';
import { getWatcher } from '../lib/watch';

export const dependencies = [
  'runTests',
  'watch'
]

const handlePath = function(options, path, stat) {
  if (!buildFilePathMatches(options, path)) {
    return;
  }

  runTests(options, function(e) {
    if (e) {
      console.error(e);
    }
  });
};

const handleAdd = function(options, path, stat) {
  handlePath(options, path, stat);
};

const handleAddDir = function(options, path, stat) {
  handlePath(options, path, stat);
};

const handleChange = function(options, path, stat) {
  handlePath(options, path, stat);
};

const handleUnlink = function(options, path, stat) {
  handlePath(options, path, stat);
};

const handleUnlinkDir = function(options, path, stat) {
  handlePath(options, path, stat);
};

const handleError = function(options, e) {
  console.error(e);
};

export const run = function(options, cb) {
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
