'use strict';

import { exists } from 'fs';
import { resolve } from 'path';

import { each } from 'async';
import { Monitor } from 'forever-monitor';

import { taskInfo } from './logging';

const monitors = {};

export const addPath = function(path, cb){
  const monitor = new Monitor(path, {
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
  return !!resolve(sourceFilePath)
    .match(RegExp(`^${resolve(options.sourcePath)}`));
};

export const startServer = function(options, filePath, cb){
  const absolutePath = resolve(filePath);

  exists(absolutePath, function(result){
    if (!result) {
      taskInfo(options.taskName, `skipping ${filePath} (Does not exist).`);
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
  const absolutePath = resolve(filePath);

  exists(absolutePath, function(result){
    if (!result) {
      taskInfo(options.taskName, `skipping ${filePath} (Does not exist).`);
      return cb();
    }

    const monitor = monitors[absolutePath];

    if (monitor) {
      removePath(absolutePath, cb);
    } else {
      taskInfo(options.taskName, `skipping ${filePath} (Monitor does not exist).`);
      cb();
    }
  });
};

export const restartServer = function(options, filePath, cb){
  const absolutePath = resolve(filePath);

  exists(absolutePath, function(result){
    if (!result) {
      taskInfo(options.taskName, `skipping ${filePath} (Does not exist).`);
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
  each(options.paths, function(v, cb) {
    startServer(options, `${options.sourcePath}/${v}`, cb);
  });
};

export const restartServers = function(options, cb){
  each(options.paths, function(v, cb) {
    restartServer(options, `${options.sourcePath}/${v}`, cb);
  });
};
