'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _import = require('lodash');

var _import2 = _interopRequireWildcard(_import);

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireWildcard(_chokidar);

var _log = require('./log');

var _log2 = _interopRequireWildcard(_log);

'use strict';

var watcher = null;

var getWatcher = function getWatcher() {
  return watcher;
};

var start = function start(options) {
  _log2['default'].debug('watch.start');

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
    atomic: true,
    ignoreInitial: true,
    ignored: /[\/\/]\./,
    persistent: true,
    usePolling: true
  });

  watcher.on('all', function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _log2['default'].debug.apply(_log2['default'], ['watch all: '].concat(args));
  });

  return watcher;
};

exports['default'] = {
  getWatcher: getWatcher,
  start: start
};
module.exports = exports['default'];