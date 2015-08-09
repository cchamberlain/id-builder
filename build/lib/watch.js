'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _import = require('lodash');

var _import2 = _interopRequireWildcard(_import);

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireWildcard(_chokidar);

var _log = require('loglevel');

var _log2 = _interopRequireWildcard(_log);

var _logging = require('./logging');

var _logging2 = _interopRequireWildcard(_logging);

var watcher = null;

function getWatcher() {
  return watcher;
}

function start(options) {
  _log2['default'].debug('lib/watch.start');

  // If there are no paths to watch, do nothing.
  if (!options.paths.length) {
    return;
  }

  // If the watcher instance already exists, return it.
  if (watcher) {
    return watcher;
  }

  _log2['default'].debug('lib/watch.start: creating watcher');

  // Start the watcher with the first path.
  watcher = _chokidar2['default'].watch(options.paths, {
    atomic: true,
    ignoreInitial: true,
    //ignored: /[\/\/]\./,
    persistent: true,
    usePolling: true
  });

  _log2['default'].debug('lib/watch.start: watching paths', options.paths);

  watcher.on('add', function (path, stat) {
    _log2['default'].debug('lib/watch.start: add', path);
  });
  watcher.on('addDir', function (path, stat) {
    _log2['default'].debug('lib/watch.start: addDir', path);
  });
  watcher.on('change', function (path, stat) {
    _log2['default'].debug('lib/watch.start: change', path);
  });
  watcher.on('unlink', function (path, stat) {
    _log2['default'].debug('lib/watch.start: unlink', path);
  });
  watcher.on('unlinkDir', function (path, stat) {
    _log2['default'].debug('lib/watch.start: unlinkDir', path);
  });
  watcher.on('error', function (path, stat) {
    _log2['default'].debug('lib/watch.start: error', path);
  });

  return watcher;
}

exports['default'] = {
  getWatcher: getWatcher,
  start: start
};
module.exports = exports['default'];