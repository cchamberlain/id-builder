import fs from 'fs';

import _ from 'lodash';
import log from 'loglevel';

import CompileTask from '../lib/CompileTask';
import logging from '../lib/logging';
import promise from '../lib/promise';

import BrowserifyCompiler from '../compilers/BrowserifyCompiler';

class BrowserifyCompileTask extends CompileTask {
  constructor(options = {}) {
    super(options);

    this.sourceFilePath = this.configuration.sourceFilePath;
    this.targetFilePath = this.configuration.targetFilePath;

    this.setCompiler(BrowserifyCompiler);
  }

  sourceFilePathMatches(sourceFilePath) {
    return this.compiler.hasDependency(sourceFilePath);
  }

  getTargetPath() {
    return this.targetFilePath;
  }

  async compileFile() {
    // log.debug(`BrowserifyCompileTask#compileFile`);

    this.compiler.setBundle();

    const doesExist = await promise.promiseFromCallback(fs.exists, this.sourceFilePath);

    if (!doesExist) {
      logging.taskInfo(this.constructor.name, `skipping ${this.sourceFilePath} (Does not exist)`);

      return;
    }

    await super.compileFile(this.sourceFilePath, this.targetFilePath);
  }

  async run() {
    await this.compileFile();
  }
}

export default BrowserifyCompileTask;

/*
function watch(options, cb) {
  log.debug('lib/browserify.watch');

  exists(options.sourceFilePath, exists => {
    if (!exists) {
      logging.taskInfo(options.taskName, `skipping ${options.sourceFilePath} (Does not exist)`);
      return cb();
    }

    fileSystem.ensureFileDirectory(options.targetFilePath, e => {
      if (e) {
        return cb(e);
      }

      const b = getBrowserifyBundle(options);

      b.add(resolve(options.sourceFilePath));

      b.on('bundle', bundleStream => {
        let data = '';

        bundleStream.on('data', d => {
          data += d;
        });

        bundleStream.on('end', () => {
          writeFile(options.targetFilePath, data, e => {
            if (e) {
              return cb(e);
            }

            logging.taskInfo(options.taskName, `${options.sourceFilePath} => ${options.targetFilePath}`);
          });
        });
      });

      const w = watchify(b);

      w.on('update', () => {
        b.bundle();
      });

      b.bundle();
    });
  });
}
*/
