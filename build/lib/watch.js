'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireDefault(_chokidar);

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

var watcher = null;

function getWatcher() {
  return watcher;
}

function start(options) {
  _loglevel2['default'].debug('lib/watch.start');

  // If there are no paths to watch, do nothing.
  if (!options.paths.length) {
    return null;
  }

  // If the watcher instance already exists, return it.
  if (watcher) {
    return watcher;
  }

  _loglevel2['default'].debug('lib/watch.start: creating watcher');

  // Start the watcher with the first path.
  watcher = _chokidar2['default'].watch(options.paths, {
    atomic: true,
    ignoreInitial: true,
    // ignored: /[\/\/]\./,
    persistent: true,
    usePolling: true
  });

  _loglevel2['default'].debug('lib/watch.start: watching paths', options.paths);

  watcher.on('add', function (path) {
    _loglevel2['default'].debug('lib/watch.start: add', path);
  });

  watcher.on('addDir', function (path) {
    _loglevel2['default'].debug('lib/watch.start: addDir', path);
  });

  watcher.on('change', function (path) {
    _loglevel2['default'].debug('lib/watch.start: change', path);
  });

  watcher.on('unlink', function (path) {
    _loglevel2['default'].debug('lib/watch.start: unlink', path);
  });

  watcher.on('unlinkDir', function (path) {
    _loglevel2['default'].debug('lib/watch.start: unlinkDir', path);
  });

  watcher.on('error', function (path) {
    _loglevel2['default'].debug('lib/watch.start: error', path);
  });

  return watcher;
}

exports['default'] = {
  getWatcher: getWatcher,
  start: start
};
module.exports = exports['default'];