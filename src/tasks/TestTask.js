// - TestTask sluit niet goed af.
// - TestTask moet voor AppServerTask gebeuren. Eerst valideren dat het werkt,
//   dan draaien.

import cp from 'child_process';
import fs from 'fs';
import path from 'path';
import vm from 'vm';

import _ from 'lodash';
import log from 'loglevel';

import Task from '../lib/Task';
import getFiles from '../lib/getFiles';

const pathToMocha = path.resolve(`${__dirname}/../../node_modules/mocha/bin/_mocha`);

class TestTask extends Task {
  constructor(options = {}) {
    super(options);

    this.mochaOptions = options.mocha;

    this.sourceDirectoryPaths = options.sourceDirectoryPaths;
  }

  getTestFilesPromises() {
    return _(this.sourceDirectoryPaths)
      .map(directoryPath => {
        return new Promise((resolve, reject) => {
          this.runTestDirectory(directoryPath, error => {
            if (error) {
              return reject(error);
            }

            resolve();
          });
        });
      })
      .value();
  }

  runTestDirectory(directoryPath, cb) {
    fs.exists(directoryPath, exists => {
      if (!exists) {
        logging.taskInfo(this.constructor.name, `Skipping: Directory "${directoryPath}" not found.`);
        return cb();
      }

      const childProcess = cp.spawn('node', [
        pathToMocha,
        '--recursive',
        '--colors',
        '--reporter',
        this.mochaOptions.reporter,
        directoryPath
      ]);

      childProcess.stdout.on('data', chunk => {
        return process.stdout.write(chunk);
      });

      childProcess.stderr.on('data', chunk => {
        return process.stderr.write(chunk);
      });

      childProcess.once('close', () => {
        cb();
      });
    });
  }

  runTests(cb) {
    Promise.all(this.getTestFilesPromises())
      .then(() => {
        cb();
      })
      .catch(cb);
  }

  run(cb) {
    this.runTests((error) => {
      if (error) {
        return cb(error);
      }

      cb()
    });
  }
}

export default TestTask;
