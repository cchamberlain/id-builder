'use strict';

import log from 'loglevel';

import coffeescript from '../lib/coffeescript';
import { getWatcher } from '../lib/watch';

const dependencies = [
  'watch'
];

const handlePath = (options, path, stat) => {
  //log.debug('watchCoffeescript.handlePath', path);

  if (!coffeescript.sourceFilePathMatches(options, path)) {
    return;
  }

  const targetPath = path
    .replace(options.sourcePath, options.targetPath)
    .replace(`.${coffeescript.sourceExtension}`, `.${coffeescript.targetExtension}`);

  //log.debug('watchCoffeescript.handlePath targetPath', targetPath);

  coffeescript.compileFile(options, path, targetPath, (e) => {
    if (e) {
      console.error(e);
    }
  });
};

const handleAdd = (options, path, stat) => {
  //log.debug('watchCoffeescript.handleAdd', path);

  handlePath(options, path, stat);
};

const handleAddDir = (options, path, stat) => {
  //log.debug('watchCoffeescript.handleAddDir', path);
};

const handleChange = (options, path, stat) => {
  //log.debug('watchCoffeescript.handleChange', path);

  handlePath(options, path, stat);
};

const handleUnlink = (options, path, stat) => {
  //log.debug('watchCoffeescript.handleUnlink', path);
};

const handleUnlinkDir = (options, path, stat) => {
  //log.debug('watchCoffeescript.handleUnlinkDir', path);
};

const handleError = (options, e) => {
  //log.debug('watchCoffeescript.handleError', options, e);
};

const run = (options, cb) => {
  //log.debug('watchCoffeescript.run', options);

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
