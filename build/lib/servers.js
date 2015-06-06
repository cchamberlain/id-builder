'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _import = require('lodash');

var _import2 = _interopRequireWildcard(_import);

var _exists = require('fs');

var _log = require('loglevel');

var _log2 = _interopRequireWildcard(_log);

var _Monitor = require('forever-monitor');

var _each = require('async');

var _logging = require('./logging');

var _logging2 = _interopRequireWildcard(_logging);

'use strict';

var monitors = {};

var addPath = function addPath(path, cb) {
  _log2['default'].debug('lib/servers.addPath', path);

  var monitor = new _Monitor.Monitor(path, {
    command: 'node'
  });

  monitors[path] = monitor;

  monitor.start();

  cb();
};

var removePath = function removePath(path, cb) {
  _log2['default'].debug('lib/servers.removePath', path);

  var monitor = monitors[path];

  monitor.kill(true);

  delete monitors[path];

  cb();
};

var restartPath = function restartPath(path, cb) {
  _log2['default'].debug('lib/servers.restartPath', path);

  var monitor = monitors[path];

  monitor.restart();

  cb();
};

var sourceFilePathMatches = function sourceFilePathMatches(options, sourceFilePath, cb) {
  return !!sourceFilePath.match(new RegExp('^' + options.sourceDirectoryPath));
};

var sourceFilePathMatchesWatchPath = function sourceFilePathMatchesWatchPath(options, sourceFilePath, cb) {
  return _import2['default'].any(options.watchPaths, function (watchPath) {
    return !!sourceFilePath.match(new RegExp('^' + watchPath));
  });
};

var startServer = function startServer(options, filePath, cb) {
  _log2['default'].debug('lib/servers.startServer');

  _exists.exists(filePath, function (result) {
    if (!result) {
      _logging2['default'].taskInfo(options.taskName, 'skipping ' + filePath + ' (Does not exist).');
      return cb();
    }

    var monitor = monitors[filePath];

    if (monitor) {
      restartPath(filePath, cb);
    } else {
      addPath(filePath, cb);
    }
  });
};

var stopServer = function stopServer(options, filePath, cb) {
  _log2['default'].debug('lib/servers.stopServer');

  _exists.exists(filePath, function (result) {
    if (!result) {
      _logging2['default'].taskInfo(options.taskName, 'skipping ' + filePath + ' (Does not exist).');
      return cb();
    }

    var monitor = monitors[filePath];

    if (monitor) {
      removePath(filePath, cb);
    } else {
      _logging2['default'].taskInfo(options.taskName, 'skipping ' + filePath + ' (Monitor does not exist).');
      cb();
    }
  });
};

var restartServer = function restartServer(options, filePath, cb) {
  _log2['default'].debug('lib/servers.restartServer');

  _exists.exists(filePath, function (result) {
    if (!result) {
      _logging2['default'].taskInfo(options.taskName, 'skipping ' + filePath + ' (Does not exist).');
      return cb();
    }

    removePath(filePath, function (e) {
      if (e) {
        return cb(e);
      }

      addPath(filePath, cb);
    });
  });
};

var runServers = function runServers(options, cb) {
  _log2['default'].debug('lib/servers.runServers');

  _each.each(options.paths, function (v, cb) {
    startServer(options, '' + options.sourceDirectoryPath + '/' + v, cb);
  }, cb);
};

var restartServers = function restartServers(options, cb) {
  _log2['default'].debug('lib/servers.restartServers');

  _each.each(options.paths, function (v, cb) {
    restartServer(options, '' + options.sourceDirectoryPath + '/' + v, cb);
  }, cb);
};

exports['default'] = {
  addPath: addPath,
  removePath: removePath,
  restartPath: restartPath,
  sourceFilePathMatches: sourceFilePathMatches,
  sourceFilePathMatchesWatchPath: sourceFilePathMatchesWatchPath,
  startServer: startServer,
  stopServer: stopServer,
  restartServer: restartServer,
  runServers: runServers,
  restartServers: restartServers
};
module.exports = exports['default'];