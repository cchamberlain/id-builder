"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
"use strict";

var _ = _interopRequire(require("lodash"));

var chokidar = _interopRequire(require("chokidar"));

var log = _interopRequireWildcard(require("./log"));

var watcher = null;

var getWatcher = function getWatcher() {
  return watcher;
};

exports.getWatcher = getWatcher;
var start = function start(options) {
  log.debug("watch.start");

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
exports.start = start;