import fs from 'fs';

import _ from 'lodash';
import log from 'loglevel';
import { Monitor } from 'forever-monitor';
import async from 'async';

import promise from '../lib/promise';
import logging from '../lib/logging';
import Task from '../lib/Task';

class ServerTask extends Task {
  constructor(options = {}) {
    super(options);

    _.bindAll(this, [
      'addPath',
      'removePath',
      'restartPath',
      'sourceFilePathMatches',
      'startServer',
      'stopServer',
      'restartServer',
      'run'
    ]);

    this.sourceDirectoryPaths = this.configuration.sourceDirectoryPaths;

    this.monitors = {};
  }

  addPath(path) {
    // log.debug(`ServerTask#addPath(${path})`);

    const monitor = new Monitor(path, {
      command: 'node'
    });

    this.monitors[path] = monitor;

    monitor.start();

    logging.taskInfo(this.constructor.name, `Started ${path}`);
  }

  removePath(path) {
    // log.debug(`ServerTask#removePath(${path})`);

    const monitor = this.monitors[path];

    if (!monitor) {
      logging.taskInfo(this.constructor.name, `Monitor not found for ${path}`);
    }

    monitor.kill(true);

    delete this.monitors[path];

    logging.taskInfo(this.constructor.name, `Stopped ${path}`);
  }

  restartPath(path) {
    // log.debug(`ServerTask#restartPath(${path})`);

    const monitor = this.monitors[path];

    monitor.restart();
  }

  sourceFilePathMatches(sourceFilePath) {
    return !!_(this.sourceDirectoryPaths)
      .any(sourceDirectoryPath => {
        return sourceFilePath.match(new RegExp(`^${sourceDirectoryPath}`));
      });
  }

  async startServer(filePath) {
    // log.debug(`ServerTask#startServer(${filePath})`);

    const doesExist = await promise.promiseFromCallback(fs.exists, filePath);

    if (!doesExist) {
      logging.taskInfo(this.constructor.name, `Skipping: "${filePath}" (Does not exist).`);

      return;
    }

    const monitor = this.monitors[filePath];

    if (monitor) {
      this.restartPath(filePath);
    } else {
      this.addPath(filePath);
    }

    return new Promise.resolve();
  }

  async stopServer(filePath) {
    // log.debug(`ServerTask#stopServer(${filePath})`);

    const doesExist = await promise.promiseFromCallback(fs.exists, filePath);

    if (!doesExist) {
      logging.taskInfo(this.constructor.name, `Skipping: "${filePath}" (Does not exist).`);

      return;
    }

    const monitor = this.monitors[filePath];

    if (monitor) {
      this.removePath(filePath);
    } else {
      logging.taskInfo(this.constructor.name, `skipping ${filePath} (Monitor does not exist).`);
    }
  }

  async restartServer(filePath) {
    // log.debug(`ServerTask#restartServer(${filePath})`);

    const doesExist = await promise.promiseFromCallback(fs.exists, filePath);

    if (!doesExist) {
      logging.taskInfo(this.constructor.name, `Skipping: "${filePath}" (Does not exist).`);

      return;
    }

    this.removePath(filePath);
    this.addPath(filePath);
  }

  async run() {
    await Promise.all(_.map(this.configuration.paths, this.startServer));
  }
}

export default ServerTask;
