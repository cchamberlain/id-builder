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

export const addPath = function(path, cb){
  const monitor = new foreverMonitor.Monitor(path, {
    command: 'node'
  });

  monitors[path] = monitor;

  monitor.start();

  cb();
};

export const removePath = function(path, cb){
  const monitor = monitors[path];

  monitor.kill(true);

  delete monitors[path];

  cb();
};

export const restartPath = function(path, cb){
  const monitor = monitors[path];

  monitor.restart();

  cb();
};

export const sourceFilePathMatches = function(options, sourceFilePath, cb){
  return p
    .resolve(sourceFilePath)
    .match(RegExp(`^${p.resolve(options.sourcePath)}`));
};

export const startServer = function(options, filePath, cb){
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

export const stopServer = function(options, filePath, cb){
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

export const restartServer = function(options, filePath, cb){
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

export const runServers = function(options, cb){
  async.each(options.paths, function(v, cb) {
    startServer(options, `${options.sourcePath}/${v}`, cb);
  });
};

export const restartServers = function(options, cb){
  async.each(options.paths, function(v, cb) {
    restartServer(options, `${options.sourcePath}/${v}`, cb);
  });
};
