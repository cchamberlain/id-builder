import cp from 'child_process';
import fs from 'fs';
import path from 'path';
import vm from 'vm';

import _ from 'lodash';
import log from 'loglevel';

import Task from '../lib/Task';
import getFiles from '../lib/getFiles';
import promise from '../lib/promise';

const pathToMocha = path.resolve(`${__dirname}/../../node_modules/mocha/bin/_mocha`);

export default class TestTask extends Task {
  constructor(options = {}) {
    super(options);

    this.sourceDirectoryPaths = this.configuration.sourceDirectoryPaths;
    this.watchDirectoryPaths = this.configuration.watchDirectoryPaths;
    this.mochaOptions = this.configuration.mocha;

    _.bindAll(this, [
      'runTestDirectory'
    ]);
  }

  async runTestDirectory(directoryPath) {
    const doesExist = await promise.promiseFromCallback(fs.exists, directoryPath);

    if (!doesExist) {
      logging.taskInfo(this.constructor.name, `Skipping: Directory "${directoryPath}" not found.`);

      return;
    }

    return new Promise((resolve, reject) => {
      const childProcess = cp.spawn('node', [
        pathToMocha,
        '--recursive',
        '--colors',
        '--reporter',
        this.mochaOptions.reporter,
        directoryPath
      ]);

      childProcess.stdout.on('data', chunk => {
        process.stdout.write(chunk);
      });

      childProcess.stderr.on('data', chunk => {
        process.stderr.write(chunk);
      });

      childProcess.on('close', () => {
        resolve();
      });
    });
  }

  async run() {
    return Promise.all(_.map(this.sourceDirectoryPaths, this.runTestDirectory));
  }
}
