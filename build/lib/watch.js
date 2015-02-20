"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _ = _interopRequire(require("lodash"));

var chokidar = _interopRequire(require("chokidar"));

var watcher = null;

var getWatcher = exports.getWatcher = function () {
  return watcher;
};

var start = exports.start = function (options) {
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
Object.defineProperty(exports, "__esModule", {
  value: true
});