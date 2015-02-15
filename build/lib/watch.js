"use strict";

var _ = require("lodash");
var chokidar = require("chokidar");

var watcher = null;

var getWatcher = function () {
  return watcher;
};

var start = function (options) {
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

  _(options.paths).each(watcher.add);

  return watcher;
};

module.exports = {
  getWatcher: getWatcher,
  start: start
};