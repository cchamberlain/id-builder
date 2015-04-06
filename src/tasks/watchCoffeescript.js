'use strict';

import log from 'loglevel';

import coffeescript from '../lib/coffeescript';
import { getWatcher } from '../lib/watch';

const dependencies = [
  'watch'
];

const handlePath = function(options, path, stat) {
  //log.debug('watchCoffeescript.handlePath', path);

  if (!coffeescript.sourceFilePathMatches(options, path)) {
    return;
  }

  const targetPath = path
    .replace(options.sourcePath, options.targetPath)
    .replace(`.${coffeescript.sourceExtension}`, `.${coffeescript.targetExtension}`);

  //log.debug('watchCoffeescript.handlePath targetPath', targetPath);

  coffeescript.compileFile(options, path, targetPath, function(e) {
    if (e) {
      console.error(e);
    }
  });
};

const handleAdd = function(options, path, stat) {
  //log.debug('watchCoffeescript.handleAdd', path);

  handlePath(options, path, stat);
};

const handleAddDir = function(options, path, stat) {
  //log.debug('watchCoffeescript.handleAddDir', path);
};

const handleChange = function(options, path, stat) {
  //log.debug('watchCoffeescript.handleChange', path);

  handlePath(options, path, stat);
};

const handleUnlink = function(options, path, stat) {
  //log.debug('watchCoffeescript.handleUnlink', path);
};

const handleUnlinkDir = function(options, path, stat) {
  //log.debug('watchCoffeescript.handleUnlinkDir', path);
};

const handleError = function(options, e) {
  //log.debug('watchCoffeescript.handleError', options, e);
};

const run = function(options, cb) {
  //log.debug('watchCoffeescript.run', options);

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
