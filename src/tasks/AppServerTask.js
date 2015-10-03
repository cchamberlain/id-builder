import { exists } from 'fs';

import _ from 'lodash';
import log from 'loglevel';
import { Monitor } from 'forever-monitor';
import { each } from 'async';

import logging from '../lib/logging';
import Task from '../lib/Task';

class AppServerTask extends Task {
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

    this.sourceDirectoryPaths = options.sourceDirectoryPaths;

    this.monitors = {};
  }

  addPath(path, cb) {
    const monitor = new Monitor(path, {
      command: 'node'
    });

    this.monitors[path] = monitor;

    monitor.start();

    logging.taskInfo(this.constructor.name, `Started ${path}`);

    cb();
  }

  removePath(path, cb) {
    const monitor = this.monitors[path];

    if (!monitor) {
      logging.taskInfo(this.constructor.name, `Monitor not found for ${path}`);
      cb();
    }

    monitor.kill(true);

    delete this.monitors[path];

    logging.taskInfo(this.constructor.name, `Stopped ${path}`);

    cb();
  }

  restartPath(path, cb) {
    const monitor = this.monitors[path];

    monitor.restart();

    cb();
  }

  sourceFilePathMatches(sourceFilePath) {
    return !!_(this.sourceDirectoryPaths)
      .any(sourceDirectoryPath => {
        return sourceFilePath.match(new RegExp(`^${sourceDirectoryPath}`));
      });
  }

  startServer(filePath, cb) {
    exists(filePath, result => {
      if (!result) {
        logging.taskInfo(this.constructor.name, `skipping ${filePath} (Does not exist).`);
        return cb();
      }

      const monitor = this.monitors[filePath];

      if (monitor) {
        this.restartPath(filePath, cb);
      } else {
        this.addPath(filePath, cb);
      }
    });
  }

  stopServer(filePath, cb) {
    exists(filePath, result => {
      if (!result) {
        logging.taskInfo(this.constructor.name, `skipping ${filePath} (Does not exist).`);
        return cb();
      }

      const monitor = this.monitors[filePath];

      if (monitor) {
        this.removePath(filePath, cb);
      } else {
        logging.taskInfo(this.constructor.name, `skipping ${filePath} (Monitor does not exist).`);
        cb();
      }
    });
  }

  restartServer(filePath, cb) {
    exists(filePath, result => {
      if (!result) {
        logging.taskInfo(this.constructor.name, `skipping ${filePath} (Does not exist).`);
        return cb();
      }

      this.removePath(filePath, e => {
        if (e) {
          return cb(e);
        }

        this.addPath(filePath, cb);
      });
    });
  }

  run() {
    each(this.options.paths, this.startServer, _.noop);
  }
}

export default AppServerTask;
