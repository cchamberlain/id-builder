"use strict";

let async = require("async");
let foreverMonitor = require("forever-monitor");
let fs = require("fs");
let path = require("path");
let preludeLs = require("prelude-ls");
let logging = require("./logging");
let p = path;
let map = preludeLs.map;

let monitors = {};

let addPath = function(path, cb){
  let monitor = new foreverMonitor.Monitor(path, {
    command: "node"
  });

  monitors[path] = monitor;

  monitor.start();

  cb();
};

let removePath = function(path, cb){
  let monitor = monitors[path];

  monitor.kill(true);

  delete monitors[path];

  cb();
};

let restartPath = function(path, cb){
  let monitor = monitors[path];

  monitor.restart();

  cb();
};

let sourceFilePathMatches = function(options, sourceFilePath, cb){
  return p
    .resolve(sourceFilePath)
    .match(RegExp(`^${p.resolve(options.sourcePath)}`));
};

let startServer = function(options, filePath, cb){
  let absolutePath = path.resolve(filePath);

  fs.exists(absolutePath, function(exists){
    if (!exists) {
      logging.taskInfo(options.taskName, `skipping ${absolutePath} (Does not exist).`);
      return cb();
    }

    let monitor = monitors[absolutePath];

    if (monitor) {
      restartPath(absolutePath, cb);
    } else {
      addPath(absolutePath, cb);
    }
  });
};

let stopServer = function(options, filePath, cb){
  let absolutePath = path.resolve(filePath);

  fs.exists(absolutePath, function(exists){
    if (!exists) {
      logging.taskInfo(options.taskName, "skipping `" + absolutePath + "` (Does not exist).");
      return cb();
    }

    let monitor = monitors[absolutePath];

    if (monitor) {
      removePath(absolutePath, cb);
    } else {
      logging.taskInfo(options.taskName, "skipping `" + absolutePath + "` (Monitor does not exist).");
      cb();
    }
  });
};

let restartServer = function(options, filePath, cb){
  let absolutePath = path.resolve(filePath);

  fs.exists(absolutePath, function(exists){
    if (!exists) {
      logging.taskInfo(options.taskName, "skipping `" + absolutePath + "` (Does not exist).");
      return cb();
    }

    removePath(absolutePath, function(error){
      if (error) {
        return cb(error);
      }

      addPath(absolutePath, cb);
    });
  });
};

let runServers = function(options, cb){
  let absolutePaths = options.paths
    .map(function(v) {
      return p.resolve(`${options.sourcePath}/${path}`);
    });

  async.each(absolutePaths, startServer(options), cb);
};

let restartServers = function(options, cb){
  let absolutePaths = options.paths
    .map(function(v) {
      return p.resolve(`${options.sourcePath}/${path}`);
    });

  async.each(absolutePaths, restartServer(options), cb);
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