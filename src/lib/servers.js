// import _ from 'lodash';
import { exists } from 'fs';

import log from 'loglevel';
import { Monitor } from 'forever-monitor';
import { each } from 'async';

import logging from './logging';

const monitors = {};

function addPath(path, cb) {
  log.debug('lib/servers.addPath', path);

  const monitor = new Monitor(path, {
    command: 'node'
  });

  monitors[path] = monitor;

  monitor.start();

  cb();
}

function removePath(path, cb) {
  log.debug('lib/servers.removePath', path);

  const monitor = monitors[path];

  monitor.kill(true);

  delete monitors[path];

  cb();
}

function restartPath(path, cb) {
  log.debug('lib/servers.restartPath', path);

  const monitor = monitors[path];

  monitor.restart();

  cb();
}

function sourceFilePathMatches(options, sourceFilePath) {
  log.debug('lib/servers.sourceFilePathMatches', `^${options.sourceDirectoryPath}`, sourceFilePath);

  return !!sourceFilePath.match(new RegExp(`^${options.sourceDirectoryPath}`));
}

function startServer(options, filePath, cb) {
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
}

function stopServer(options, filePath, cb) {
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
}

function restartServer(options, filePath, cb) {
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
}

function runServers(options, cb) {
  log.debug('lib/servers.runServers');

  each(options.paths, (v, eachCb) => {
    startServer(options, `${options.sourceDirectoryPath}/${v}`, eachCb);
  }, cb);
}

function restartServers(options, cb) {
  log.debug('lib/servers.restartServers');

  each(options.paths, (v, eachCb) => {
    restartServer(options, `${options.sourceDirectoryPath}/${v}`, eachCb);
  }, cb);
}

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
