'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _import = require('lodash');

var _ = _interopRequire(_import);

var _chokidar = require('chokidar');

var chokidar = _interopRequire(_chokidar);

var _import2 = require('./log');

var log = _interopRequireWildcard(_import2);

'use strict';

var watcher = null;

var getWatcher = function getWatcher() {
  return watcher;
};

exports.getWatcher = getWatcher;
var start = function start(options) {
  log.debug('watch.start');

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