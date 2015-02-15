"use strict";

var fs = require("fs");
var path = require("path");

var _ = require("lodash");
var async = require("async");
var foreverMonitor = require("forever-monitor");
var preludeLs = require("prelude-ls");
var logging = require("./logging");
var p = path;
var map = preludeLs.map;

var monitors = {};

var addPath = function (path, cb) {
  var monitor = new foreverMonitor.Monitor(path, {
    command: "node"
  });

  monitors[path] = monitor;

  monitor.start();

  cb();
};

var removePath = function (path, cb) {
  var monitor = monitors[path];

  monitor.kill(true);

  delete monitors[path];

  cb();
};

var restartPath = function (path, cb) {
  var monitor = monitors[path];

  monitor.restart();

  cb();
};

var sourceFilePathMatches = function (options, sourceFilePath, cb) {
  return p.resolve(sourceFilePath).match(RegExp("^" + p.resolve(options.sourcePath)));
};

var startServer = function (options, filePath, cb) {
  var absolutePath = path.resolve(filePath);

  fs.exists(absolutePath, function (exists) {
    if (!exists) {
      logging.taskInfo(options.taskName, "skipping " + absolutePath + " (Does not exist).");
      return cb();
    }

    var monitor = monitors[absolutePath];

    if (monitor) {
      restartPath(absolutePath, cb);
    } else {
      addPath(absolutePath, cb);
    }
  });
};

var stopServer = function (options, filePath, cb) {
  var absolutePath = path.resolve(filePath);

  fs.exists(absolutePath, function (exists) {
    if (!exists) {
      logging.taskInfo(options.taskName, "skipping `" + absolutePath + "` (Does not exist).");
      return cb();
    }

    var monitor = monitors[absolutePath];

    if (monitor) {
      removePath(absolutePath, cb);
    } else {
      logging.taskInfo(options.taskName, "skipping `" + absolutePath + "` (Monitor does not exist).");
      cb();
    }
  });
};

var restartServer = function (options, filePath, cb) {
  var absolutePath = path.resolve(filePath);

  fs.exists(absolutePath, function (exists) {
    if (!exists) {
      logging.taskInfo(options.taskName, "skipping `" + absolutePath + "` (Does not exist).");
      return cb();
    }

    removePath(absolutePath, function (e) {
      if (e) {
        return cb(e);
      }

      addPath(absolutePath, cb);
    });
  });
};

var runServers = function (options, cb) {
  var absolutePaths = _(options.paths).map(function (v) {
    return path.resolve("" + options.sourcePath + "/" + path);
  }).value();

  async.each(absolutePaths, function (v, cb) {
    startServer(options, v, cb);
  });
};

var restartServers = function (options, cb) {
  var absolutePaths = _(options.paths).map(function (v) {
    return path.resolve("" + options.sourcePath + "/" + path);
  }).value();

  async.each(absolutePaths, function (v, cb) {
    restartServer(options, v, cb);
  });
};

module.exports = {
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