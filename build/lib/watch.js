"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _ = _interopRequire(require("lodash"));

var chokidar = _interopRequire(require("chokidar"));

var watcher = null;

var getWatcher = exports.getWatcher = function () {
  return watcher;
};

var start = exports.start = function (options) {
  // If there are no paths to watch, do nothing.
  if (!options.paths.length) {
    return;
  }

  // If the watcher instance already exists, return it.
  if (watcher) {
    return watcher;
  }

  // Start the watcher with the first path.
  watcher = chokidar.watch(options.paths, {
    ignored: /[\/\/]\./,
    persistent: true,
    ignoreInitial: true,
    usePolling: true
  });

  return watcher;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});