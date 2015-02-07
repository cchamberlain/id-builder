"use strict";

let chokidar = require("chokidar");

let watcher = null;

let getWatcher = function() {
  return watcher;
};

let start = function(options) {
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

  for (let i = 1, l = options.paths.length; i < l; i++) {
    watcher.add(options.paths[i]);
  }

  return watcher;
};

module.exports = {
  getWatcher: getWatcher,
  start: start
};