'use strict';

import logging from '../lib/logging';
import babel from '../lib/babel';
import watch from '../lib/watch';
import fileSystem from '../lib/fileSystem'

const dependencies = [
  'watch'
];

const handleAdd = function(options, path, stat) {
  if (!babel.sourceFilePathMatches(options, path)) {
    return;
  }

  const targetPath = path
    .replace(options.sourceDirectoryPath, options.targetDirectoryPath)
    .replace(new RegExp(`^\.${babel.sourceExtension}$`), `.${babel.targetExtension}`);

  babel.compileFile(options, path, targetPath, e => {
    if (e) {
      logging.taskError(e);
    }
  });
};

const handleAddDir = function(options, path, stat) {
  if (!babel.sourceFilePathMatches(options, path)) {
    return;
  }

  babel.compileAllFiles({ sourceDirectoryPath: path }, e => {
    if (e) {
      logging.taskError(e);
    }
  });
};

const handleChange = function(options, path, stat) {
  if (!babel.sourceFilePathMatches(options, path)) {
    return;
  }

  const targetPath = path
    .replace(options.sourceDirectoryPath, options.targetDirectoryPath)
    .replace(new RegExp(`^\.${babel.sourceExtension}$`), `.${babel.targetExtension}`);

  babel.compileFile(options, path, targetPath, e => {
    if (e) {
      logging.taskError(e);
    }
  });
};

const handleUnlink = function(options, path, stat) {
  if (!babel.sourceFilePathMatches(options, path)) {
    return;
  }

  fileSystem.removePath(path, e => {
    if (e) {
      logging.taskError(e);
    }
  });
};

const handleUnlinkDir = function(options, path, stat) {
  if (!babel.sourceFilePathMatches(options, path)) {
    return;
  }

  fileSystem.removePath(path, e => {
    if (e) {
      logging.taskError(e);
    }
  });
};

const handleError = function(options, e) {
  if (!babel.sourceFilePathMatches(options, path)) {
    return;
  }

  logging.taskError(e);
};

const run = function(options, cb) {
  const watcher = watch.getWatcher();

  watcher.on('ready', () => {
    watcher.on('add', (path, stat) => { handleAdd(options, path, stat); });
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
