// import _ from 'lodash';
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

var _foreverMonitor = require('forever-monitor');

var _async = require('async');

var _logging = require('./logging');

var _logging2 = _interopRequireDefault(_logging);

var monitors = {};

function addPath(path, cb) {
  _loglevel2['default'].debug('lib/servers.addPath', path);

  var monitor = new _foreverMonitor.Monitor(path, {
    command: 'node'
  });

  monitors[path] = monitor;

  monitor.start();

  cb();
}

function removePath(path, cb) {
  _loglevel2['default'].debug('lib/servers.removePath', path);

  var monitor = monitors[path];

  monitor.kill(true);

  delete monitors[path];

  cb();
}

function restartPath(path, cb) {
  _loglevel2['default'].debug('lib/servers.restartPath', path);

  var monitor = monitors[path];

  monitor.restart();

  cb();
}

function sourceFilePathMatches(options, sourceFilePath) {
  _loglevel2['default'].debug('lib/servers.sourceFilePathMatches', '^' + options.sourceDirectoryPath, sourceFilePath);

  return !!sourceFilePath.match(new RegExp('^' + options.sourceDirectoryPath));
}

function startServer(options, filePath, cb) {
  _loglevel2['default'].debug('lib/servers.startServer');

  (0, _fs.exists)(filePath, function (result) {
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
  _loglevel2['default'].debug('lib/servers.stopServer');

  (0, _fs.exists)(filePath, function (result) {
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
  _loglevel2['default'].debug('lib/servers.restartServer');

  (0, _fs.exists)(filePath, function (result) {
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
  _loglevel2['default'].debug('lib/servers.runServers');

  (0, _async.each)(options.paths, function (v, eachCb) {
    startServer(options, options.sourceDirectoryPath + '/' + v, eachCb);
  }, cb);
}

function restartServers(options, cb) {
  _loglevel2['default'].debug('lib/servers.restartServers');

  (0, _async.each)(options.paths, function (v, eachCb) {
    restartServer(options, options.sourceDirectoryPath + '/' + v, eachCb);
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