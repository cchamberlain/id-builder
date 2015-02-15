'use strict';

const fs = require('fs');
const path = require('path');

const _ = require('lodash')
const async = require('async');
const foreverMonitor = require('forever-monitor');
const preludeLs = require('prelude-ls');
const logging = require('./logging');
const p = path;
const map = preludeLs.map;

const monitors = {};

const addPath = function(path, cb){
  const monitor = new foreverMonitor.Monitor(path, {
    command: 'node'
  });

  monitors[path] = monitor;

  monitor.start();

  cb();
};

const removePath = function(path, cb){
  const monitor = monitors[path];

  monitor.kill(true);

  delete monitors[path];

  cb();
};

const restartPath = function(path, cb){
  const monitor = monitors[path];

  monitor.restart();

  cb();
};

const sourceFilePathMatches = function(options, sourceFilePath, cb){
  return p
    .resolve(sourceFilePath)
    .match(RegExp(`^${p.resolve(options.sourcePath)}`));
};

const startServer = function(options, filePath, cb){
  const absolutePath = path.resolve(filePath);

  fs.exists(absolutePath, function(exists){
    if (!exists) {
      logging.taskInfo(options.taskName, `skipping ${absolutePath} (Does not exist).`);
      return cb();
    }

    const monitor = monitors[absolutePath];

    if (monitor) {
      restartPath(absolutePath, cb);
    } else {
      addPath(absolutePath, cb);
    }
  });
};

const stopServer = function(options, filePath, cb){
  const absolutePath = path.resolve(filePath);

  fs.exists(absolutePath, function(exists){
    if (!exists) {
      logging.taskInfo(options.taskName, 'skipping `' + absolutePath + '` (Does not exist).');
      return cb();
    }

    const monitor = monitors[absolutePath];

    if (monitor) {
      removePath(absolutePath, cb);
    } else {
      logging.taskInfo(options.taskName, 'skipping `' + absolutePath + '` (Monitor does not exist).');
      cb();
    }
  });
};

const restartServer = function(options, filePath, cb){
  const absolutePath = path.resolve(filePath);

  fs.exists(absolutePath, function(exists){
    if (!exists) {
      logging.taskInfo(options.taskName, 'skipping `' + absolutePath + '` (Does not exist).');
      return cb();
    }

    removePath(absolutePath, function(e){
      if (e) {
        return cb(e);
      }

      addPath(absolutePath, cb);
    });
  });
};

const runServers = function(options, cb){
  const absolutePaths = _(options.paths)
    .map(function(v) {
      return path.resolve(`${options.sourcePath}/${path}`);
    })
    .value();

  async.each(absolutePaths, function(v, cb) {
    startServer(options, v, cb);
  });
};

const restartServers = function(options, cb){
  const absolutePaths = _(options.paths)
    .map(function(v) {
      return path.resolve(`${options.sourcePath}/${path}`);
    })
    .value();

  async.each(absolutePaths, function(v, cb) {
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