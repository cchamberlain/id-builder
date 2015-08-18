import { exists } from 'fs';

import { noop } from 'lodash';
import { Monitor } from 'forever-monitor';
import { each } from 'async';

import logging from '../lib/logging';
import Task from '../lib/Task';

class AppServer extends Task {
  constructor(options = {}) {
    super(options);

    this.sourceDirectoryPath = options.sourceDirectoryPath;

    this.monitors = {};
  }

  addPath(path, cb) {
    const monitor = new Monitor(path, {
      command: 'node'
    });

    this.monitors[path] = monitor;

    monitor.start();

    cb();
  }

  removePath(path, cb) {
    const monitor = this.monitors[path];

    monitor.kill(true);

    delete this.monitors[path];

    cb();
  }

  restartPath(path, cb) {
    const monitor = this.monitors[path];

    monitor.restart();

    cb();
  }

  sourceFilePathMatches(sourceFilePath) {
    return !!sourceFilePath.match(new RegExp(`^${this.sourceDirectoryPath}`));
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
    console.log('WHAT');

    each(this.options.paths, (v, cb) => {
      this.startServer(`${this.sourceDirectoryPath}/${v}`, cb);
    }, noop);
  }
}

export default AppServer;
