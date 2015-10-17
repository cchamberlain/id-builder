import _ from 'lodash';
import { exists } from 'fs';
import log from 'loglevel';

import CompileTask from '../lib/CompileTask';
import logging from '../lib/logging';

import BrowserifyCompiler from '../compilers/BrowserifyCompiler';

class BrowserifyCompileTask extends CompileTask {
  constructor(options = {}) {
    super(options);

    this.sourceFilePath = options.sourceFilePath;
    this.targetFilePath = options.targetFilePath;

    this.setCompiler(BrowserifyCompiler);
  }

  sourceFilePathMatches(sourceFilePath) {
    return this.compiler.hasDependency(sourceFilePath);
  }

  getTargetPath() {
    return this.targetFilePath;
  }

  compileFile(sourceFilePath, targetFilePath, cb) {
    this.compiler.setBundle();

    exists(this.sourceFilePath, (doesExist) => {
      if (doesExist) {
        super.compileFile(this.sourceFilePath, this.targetFilePath, cb);
      } else {
        logging.taskInfo(this.constructor.name, `skipping ${this.sourceFilePath} (Does not exist)`);

        cb();
      }
    });
  }

  run(cb) {
    this.compileFile(this.sourceFilePath, this.targetFilePath, cb);
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
