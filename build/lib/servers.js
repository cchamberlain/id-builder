'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});
// import _ from 'lodash';

var _exists = require('fs');

var _log = require('loglevel');

var _log2 = _interopRequireWildcard(_log);

var _Monitor = require('forever-monitor');

var _each = require('async');

var _logging = require('./logging');

var _logging2 = _interopRequireWildcard(_logging);

var monitors = {};

function addPath(path, cb) {
  _log2['default'].debug('lib/servers.addPath', path);

  var monitor = new _Monitor.Monitor(path, {
    command: 'node'
  });

  monitors[path] = monitor;

  monitor.start();

  cb();
}

function removePath(path, cb) {
  _log2['default'].debug('lib/servers.removePath', path);

  var monitor = monitors[path];

  monitor.kill(true);

  delete monitors[path];

  cb();
}

function restartPath(path, cb) {
  _log2['default'].debug('lib/servers.restartPath', path);

  var monitor = monitors[path];

  monitor.restart();

  cb();
}

function sourceFilePathMatches(options, sourceFilePath) {
  _log2['default'].debug('lib/servers.sourceFilePathMatches', '^' + options.sourceDirectoryPath, sourceFilePath);

  return !!sourceFilePath.match(new RegExp('^' + options.sourceDirectoryPath));
}

function startServer(options, filePath, cb) {
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
}

function stopServer(options, filePath, cb) {
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
}

function restartServer(options, filePath, cb) {
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
}

function runServers(options, cb) {
  _log2['default'].debug('lib/servers.runServers');

  _each.each(options.paths, function (v, eachCb) {
    startServer(options, '' + options.sourceDirectoryPath + '/' + v, eachCb);
  }, cb);
}

function restartServers(options, cb) {
  _log2['default'].debug('lib/servers.restartServers');

  _each.each(options.paths, function (v, eachCb) {
    restartServer(options, '' + options.sourceDirectoryPath + '/' + v, eachCb);
  }, cb);
}

exports['default'] = {
  addPath: addPath,
  removePath: removePath,
  restartPath: restartPath,
  sourceFilePathMatches: sourceFilePathMatches,
  startServer: startServer,
  stopServer: stopServer,
  restartServer: restartServer,
  runServers: runServers,
  restartServers: restartServers
};
module.exports = exports['default'];