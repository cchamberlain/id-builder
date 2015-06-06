'use strict';

import _ from 'lodash';
import { exists } from 'fs';

import log from 'loglevel';
import { Monitor } from 'forever-monitor';
import { each } from 'async';

import logging from './logging';

const monitors = {};

const addPath = function(path, cb){
  log.debug('lib/servers.addPath', path);

  const monitor = new Monitor(path, {
    command: 'node'
  });

  monitors[path] = monitor;

  monitor.start();

  cb();
};

const removePath = function(path, cb){
  log.debug('lib/servers.removePath', path);

  const monitor = monitors[path];

  monitor.kill(true);

  delete monitors[path];

  cb();
};

const restartPath = function(path, cb){
  log.debug('lib/servers.restartPath', path);

  const monitor = monitors[path];

  monitor.restart();

  cb();
};

const sourceFilePathMatches = function(options, sourceFilePath, cb){
  return !!sourceFilePath.match(new RegExp(`^${options.sourceDirectoryPath}`))
};

const sourceFilePathMatchesWatchPath = function(options, sourceFilePath, cb){
  return _.any(options.watchPaths, (watchPath) => {
    return !!sourceFilePath.match(new RegExp(`^${watchPath}`));
  });
};

const startServer = function(options, filePath, cb){
  log.debug('lib/servers.startServer');

  exists(filePath, result => {
    if (!result) {
      logging.taskInfo(options.taskName, `skipping ${filePath} (Does not exist).`);
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
  log.debug('lib/servers.stopServer');

  exists(filePath, result => {
    if (!result) {
      logging.taskInfo(options.taskName, `skipping ${filePath} (Does not exist).`);
      return cb();
    }

    const monitor = monitors[filePath];

    if (monitor) {
      removePath(filePath, cb);
    } else {
      logging.taskInfo(options.taskName, `skipping ${filePath} (Monitor does not exist).`);
      cb();
    }
  });
};

const restartServer = function(options, filePath, cb) {
  log.debug('lib/servers.restartServer');

  exists(filePath, result => {
    if (!result) {
      logging.taskInfo(options.taskName, `skipping ${filePath} (Does not exist).`);
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
  log.debug('lib/servers.runServers');

  each(options.paths, (v, cb) => {
    startServer(options, `${options.sourceDirectoryPath}/${v}`, cb);
  }, cb);
};

const restartServers = function(options, cb){
  log.debug('lib/servers.restartServers');

  each(options.paths, (v, cb) => {
    restartServer(options, `${options.sourceDirectoryPath}/${v}`, cb);
  }, cb);
};

export default {
  addPath,
  removePath,
  restartPath,
  sourceFilePathMatches,
  sourceFilePathMatchesWatchPath,
  startServer,
  stopServer,
  restartServer,
  runServers,
  restartServers
};
