"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var exists = require("fs").exists;
var Monitor = require("forever-monitor").Monitor;
var each = require("async").each;
var log = _interopRequireWildcard(require("./log"));

var monitors = {};

var addPath = exports.addPath = function (path, cb) {
  log.debug("servers.addPath", path);

  var monitor = new Monitor(path, {
    command: "node"
  });

  monitors[path] = monitor;

  monitor.start();

  cb();
};

var removePath = exports.removePath = function (path, cb) {
  log.debug("servers.removePath", path);

  log.debug("monitors", monitors);

  var monitor = monitors[path];

  monitor.kill(true);

  delete monitors[path];

  cb();
};

var restartPath = exports.restartPath = function (path, cb) {
  log.debug("servers.restartPath", path);

  var monitor = monitors[path];

  monitor.restart();

  cb();
};

var sourceFilePathMatches = exports.sourceFilePathMatches = function (options, sourceFilePath, cb) {
  log.debug("servers.sourceFilePathMatches", options, sourceFilePath);

  var result = !!sourceFilePath.match(RegExp("^" + options.sourcePath));

  log.debug("servers.sourceFilePathMatches =>", result);

  return result;
};

var startServer = exports.startServer = function (options, filePath, cb) {
  log.debug("servers.startServer", options, filePath);

  exists(filePath, function (result) {
    if (!result) {
      log.taskInfo(options.taskName, "skipping " + filePath + " (Does not exist).");
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

var stopServer = exports.stopServer = function (options, filePath, cb) {
  log.debug("servers.stopServer", options, filePath);

  exists(filePath, function (result) {
    if (!result) {
      log.taskInfo(options.taskName, "skipping " + filePath + " (Does not exist).");
      return cb();
    }

    var monitor = monitors[filePath];

    if (monitor) {
      removePath(filePath, cb);
    } else {
      log.taskInfo(options.taskName, "skipping " + filePath + " (Monitor does not exist).");
      cb();
    }
  });
};

var restartServer = exports.restartServer = function (options, filePath, cb) {
  log.debug("servers.restartServer", options, filePath);

  exists(filePath, function (result) {
    if (!result) {
      log.taskInfo(options.taskName, "skipping " + filePath + " (Does not exist).");
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

var runServers = exports.runServers = function (options, cb) {
  log.debug("servers.runServers", options);

  each(options.paths, function (v, cb) {
    startServer(options, "" + options.sourcePath + "/" + v, cb);
  });
};

var restartServers = exports.restartServers = function (options, cb) {
  log.debug("servers.restartServers", options);

  each(options.paths, function (v, cb) {
    restartServer(options, "" + options.sourcePath + "/" + v, cb);
  });
};
Object.defineProperty(exports, "__esModule", {
  value: true
});