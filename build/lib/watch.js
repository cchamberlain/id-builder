'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _import = require('lodash');

var _import2 = _interopRequireWildcard(_import);

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireWildcard(_chokidar);

var _import3 = require('./log');

var log = _interopRequireWildcard(_import3);

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
  watcher = _chokidar2['default'].watch(options.paths, {
    ignored: /[\/\/]\./,
    persistent: true,
    ignoreInitial: true,
    usePolling: true
  });

  return watcher;
};
exports.start = start;