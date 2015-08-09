'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _log = require('loglevel');

var _log2 = _interopRequireWildcard(_log);

var _logging = require('../lib/logging');

var _logging2 = _interopRequireWildcard(_logging);

var _servers = require('../lib/servers');

var _servers2 = _interopRequireWildcard(_servers);

var _watch = require('../lib/watch');

var _watch2 = _interopRequireWildcard(_watch);

var dependencies = ['watch'];

function handlePath(options, path, stat) {
  _log2['default'].debug('watchServers.handlePath', options, path);

  if (!_servers2['default'].sourceFilePathMatches(options, path)) {
    return;
  }

  _log2['default'].debug('watchServers.handlePath restarting servers');

  _servers2['default'].restartServers(options, function (e) {
    _log2['default'].debug('watchServers.handlePath servers restarted!');

    if (e) {
      _logging2['default'].taskError(e);
    }
  });
}

function handleAdd(options, path, stat) {
  handlePath(options, path, stat);
}

function handleAddDir(options, path, stat) {}

function handleChange(options, path, stat) {
  handlePath(options, path, stat);
}

function handleUnlink(options, path, stat) {}

function handleUnlinkDir(options, path, stat) {}

function handleError(options, e) {}

function run(options, cb) {
  var watcher = _watch2['default'].getWatcher();

  watcher.on('ready', function () {
    watcher.on('add', function (path, stat) {
      handleAdd(options, path, stat);
    });
    watcher.on('addDir', function (path, stat) {
      handleAddDir(options, path, stat);
    });
    watcher.on('change', function (path, stat) {
      handleChange(options, path, stat);
    });
    watcher.on('unlink', function (path, stat) {
      handleUnlink(options, path, stat);
    });
    watcher.on('unlinkDir', function (path, stat) {
      handleUnlinkDir(options, path, stat);
    });
    watcher.on('error', function (path, stat) {
      handleError(options, path, stat);
    });
  });
}

exports['default'] = {
  dependencies: dependencies,
  run: run
};
module.exports = exports['default'];