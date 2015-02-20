'use strict';

import babel from '../lib/babel';
import { getWatcher } from '../lib/watch';

export const dependencies = [
  'watch'
]

const handlePath = function(options, path, stat) {
  if (!babel.sourceFilePathMatches(options, path)) {
    return;
  }

  const targetPath = path
    .replace(options.sourcePath, options.targetPath)
    .replace(new RegExp(`^\.${babel.sourceExtension}$`), `.${babel.targetExtension}`);

  babel.compileFile(options, path, targetPath, function(e) {
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
