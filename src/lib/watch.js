'use strict';

const _ = require('lodash');
const chokidar = require('chokidar');

var watcher = null;

const getWatcher = function() {
  return watcher;
};

const start = function(options) {
  if (!options.paths.length) {
    return;
  }

  if (watcher) {
    return watcher;
  }

  watcher = chokidar.watch(options.paths[0], {
    ignored: /[\/\/]\./,
    persistent: true,
    ignoreInitial: true
  });

  _(options.paths)
    .each(watcher.add);

  return watcher;
};

module.exports = {
  getWatcher: getWatcher,
  start: start
};
