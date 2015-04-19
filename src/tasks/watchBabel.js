'use strict';

import log from 'loglevel';
import babel from '../lib/babel';
import { getWatcher } from '../lib/watch';
import { removePath } from '../lib/fileSystem'

const dependencies = [
  'watch'
]

const handleAdd = function(options, path, stat) {
  if (!babel.sourceFilePathMatches(options, path)) {
    return;
  }

  const targetPath = path
    .replace(options.sourcePath, options.targetPath)
    .replace(new RegExp(`^\.${babel.sourceExtension}$`), `.${babel.targetExtension}`);

  babel.compileFile(options, path, targetPath, e => {
    if (e) {
      log.error(e);
    }
  });
};

const handleAddDir = function(options, path, stat) {
  if (!babel.sourceFilePathMatches(options, path)) {
    return;
  }

  babel.compileAllFiles({ sourcePath: path }, e => {
    if (e) {
      log.error(e);
    }
  });
};

const handleChange = function(options, path, stat) {
  if (!babel.sourceFilePathMatches(options, path)) {
    return;
  }

  const targetPath = path
    .replace(options.sourcePath, options.targetPath)
    .replace(new RegExp(`^\.${babel.sourceExtension}$`), `.${babel.targetExtension}`);

  babel.compileFile(options, path, targetPath, e => {
    if (e) {
      log.error(e);
    }
  });
};

const handleUnlink = function(options, path, stat) {
  if (!babel.sourceFilePathMatches(options, path)) {
    return;
  }

  removePath(path, e => {
    if (e) {
      log.error(e);
    }
  });
};

const handleUnlinkDir = function(options, path, stat) {
  if (!babel.sourceFilePathMatches(options, path)) {
    return;
  }

  removePath(path, e => {
    if (e) {
      log.error(e);
    }
  });
};

const handleError = function(options, e) {
  if (!babel.sourceFilePathMatches(options, path)) {
    return;
  }

  log.error(e);
};

const run = function(options, cb) {
  const watcher = getWatcher();

  watcher.on('ready', function() {
    watcher.on('add',       function(path, stat) { handleAdd(options, path, stat) });
    watcher.on('addDir',    function(path, stat) { handleAddDir(options, path, stat) });
    watcher.on('change',    function(path, stat) { handleChange(options, path, stat) });
    watcher.on('unlink',    function(path, stat) { handleUnlink(options, path, stat) });
    watcher.on('unlinkDir', function(path, stat) { handleUnlinkDir(options, path, stat) });
    watcher.on('error',     function(path, stat) { handleError(options, path, stat) });
  });
};

export default {
  dependencies,
  run
};
