'use strict';

import { exists } from 'fs';

import { Monitor } from 'forever-monitor';
import { each } from 'async';

import log from './log';

const monitors = {};

const addPath = function(path, cb){
  log.debug('servers.addPath', path);

  const monitor = new Monitor(path, {
    command: 'node'
  });

  monitors[path] = monitor;

  monitor.start();

  cb();
};

const removePath = function(path, cb){
  log.debug('servers.removePath', path);

  log.debug('monitors', monitors);

  const monitor = monitors[path];

  monitor.kill(true);

  delete monitors[path];

  cb();
};

const restartPath = function(path, cb){
  log.debug('servers.restartPath', path);

  const monitor = monitors[path];

  monitor.restart();

  cb();
};

const sourceFilePathMatches = function(options, sourceFilePath, cb){
  return !!sourceFilePath.match(RegExp(`^${options.sourceDirectoryPath}`))
};

const startServer = function(options, filePath, cb){
  log.debug('servers.startServer', options, filePath);

  exists(filePath, result => {
    if (!result) {
      log.taskInfo(options.taskName, `skipping ${filePath} (Does not exist).`);
      return cb();
    }

    const monitor = monitors[filePath];

    if (monitor) {
      restartPath(filePath, cb);
    } else {
      addPath(filePath, cb);
    }
  });
};

const stopServer = function(options, filePath, cb) {
  log.debug('servers.stopServer', options, filePath);

  exists(filePath, result => {
    if (!result) {
      log.taskInfo(options.taskName, `skipping ${filePath} (Does not exist).`);
      return cb();
    }

    const monitor = monitors[filePath];

    if (monitor) {
      removePath(filePath, cb);
    } else {
      log.taskInfo(options.taskName, `skipping ${filePath} (Monitor does not exist).`);
      cb();
    }
  });
};

const restartServer = function(options, filePath, cb) {
  log.debug('servers.restartServer', options, filePath);

  exists(filePath, result => {
    if (!result) {
      log.taskInfo(options.taskName, `skipping ${filePath} (Does not exist).`);
      return cb();
    }

    removePath(filePath, e => {
      if (e) {
        return cb(e);
      }

      addPath(filePath, cb);
    });
  });
};

const runServers = function(options, cb){
  log.debug('servers.runServers', options);

  each(options.paths, (v, cb) => {
    startServer(options, `${options.sourceDirectoryPath}/${v}`, cb);
  });
};

const restartServers = function(options, cb){
  log.debug('servers.restartServers', options);

  each(options.paths, (v, cb) => {
    restartServer(options, `${options.sourceDirectoryPath}/${v}`, cb);
  });
};

export default {
  addPath,
  removePath,
  restartPath,
  sourceFilePathMatches,
  startServer,
  stopServer,
  restartServer,
  runServers,
  restartServers
};
