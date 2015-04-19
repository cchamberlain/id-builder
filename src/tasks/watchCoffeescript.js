'use strict';

import log from 'loglevel';

import coffeescript from '../lib/coffeescript';
import { getWatcher } from '../lib/watch';
import { removePath } from '../lib/fileSystem'

const dependencies = [
  'watch'
]

const handleAdd = function(options, path, stat) {
  if (!coffeescript.sourceFilePathMatches(options, path)) {
    return;
  }

  const targetPath = path
    .replace(options.sourcePath, options.targetPath)
    .replace(`.${coffeescript.sourceExtension}`, `.${coffeescript.targetExtension}`);

  coffeescript.compileFile(options, path, targetPath, function(e) {
    if (e) {
      log.error(e);
    }
  });
};

const handleAddDir = function(options, path, stat) {
  if (!coffeescript.sourceFilePathMatches(options, path)) {
    return;
  }

  coffeescript.compileAllFiles({ sourcePath: path }, e => {
    if (e) {
      log.error(e);
    }
  });
};

const handleChange = function(options, path, stat) {
  if (!coffeescript.sourceFilePathMatches(options, path)) {
    return;
  }

  const targetPath = path
    .replace(options.sourcePath, options.targetPath)
    .replace(`.${coffeescript.sourceExtension}`, `.${coffeescript.targetExtension}`);

  coffeescript.compileFile(options, path, targetPath, function(e) {
    if (e) {
      log.error(e);
    }
  });
};

const handleUnlink = function(options, path, stat) {
  if (!coffeescript.sourceFilePathMatches(options, path)) {
    return;
  }

  removePath(path, e => {
    if (e) {
      log.error(e);
    }
  });
};

const handleUnlinkDir = function(options, path, stat) {
  if (!coffeescript.sourceFilePathMatches(options, path)) {
    return;
  }

  removePath(path, e => {
    if (e) {
      log.error(e);
    }
  });
};

const handleError = function(options, e) {
  log.error(e);
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
