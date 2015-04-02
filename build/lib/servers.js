'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _exists = require('fs');

var _Monitor = require('forever-monitor');

var _each = require('async');

var _import = require('./log');

var log = _interopRequireWildcard(_import);

'use strict';

var monitors = {};

var addPath = function addPath(path, cb) {
  log.debug('servers.addPath', path);

  var monitor = new _Monitor.Monitor(path, {
    command: 'node'
  });

  monitors[path] = monitor;

  monitor.start();

  cb();
};

exports.addPath = addPath;
var removePath = function removePath(path, cb) {
  log.debug('servers.removePath', path);

  log.debug('monitors', monitors);

  var monitor = monitors[path];

  monitor.kill(true);

  delete monitors[path];

  cb();
};

exports.removePath = removePath;
var restartPath = function restartPath(path, cb) {
  log.debug('servers.restartPath', path);

  var monitor = monitors[path];

  monitor.restart();

  cb();
};

exports.restartPath = restartPath;
var sourceFilePathMatches = function sourceFilePathMatches(options, sourceFilePath, cb) {
  log.debug('servers.sourceFilePathMatches', options, sourceFilePath);

  var result = !!sourceFilePath.match(RegExp('^' + options.sourcePath));

  log.debug('servers.sourceFilePathMatches =>', result);

  return result;
};

exports.sourceFilePathMatches = sourceFilePathMatches;
var startServer = function startServer(options, filePath, cb) {
  log.debug('servers.startServer', options, filePath);

  _exists.exists(filePath, function (result) {
    if (!result) {
      log.taskInfo(options.taskName, 'skipping ' + filePath + ' (Does not exist).');
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

exports.startServer = startServer;
var stopServer = function stopServer(options, filePath, cb) {
  log.debug('servers.stopServer', options, filePath);

  _exists.exists(filePath, function (result) {
    if (!result) {
      log.taskInfo(options.taskName, 'skipping ' + filePath + ' (Does not exist).');
      return cb();
    }

    var monitor = monitors[filePath];

    if (monitor) {
      removePath(filePath, cb);
    } else {
      log.taskInfo(options.taskName, 'skipping ' + filePath + ' (Monitor does not exist).');
      cb();
    }
  });
};

exports.stopServer = stopServer;
var restartServer = function restartServer(options, filePath, cb) {
  log.debug('servers.restartServer', options, filePath);

  _exists.exists(filePath, function (result) {
    if (!result) {
      log.taskInfo(options.taskName, 'skipping ' + filePath + ' (Does not exist).');
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

exports.restartServer = restartServer;
var runServers = function runServers(options, cb) {
  log.debug('servers.runServers', options);

  _each.each(options.paths, function (v, cb) {
    startServer(options, '' + options.sourcePath + '/' + v, cb);
  });
};

exports.runServers = runServers;
var restartServers = function restartServers(options, cb) {
  log.debug('servers.restartServers', options);

  _each.each(options.paths, function (v, cb) {
    restartServer(options, '' + options.sourcePath + '/' + v, cb);
  });
};
exports.restartServers = restartServers;