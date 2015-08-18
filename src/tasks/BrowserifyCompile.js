import { resolve } from 'path';

import browserify from 'browserify';
import jadeify from 'jadeify';
import { exists } from 'fs';

import logging from '../lib/logging';
import CompileTask from '../lib/CompileTask';

class BrowserifyCompile extends CompileTask {
  constructor(options = {}) {
    super(options);

    this.sourceFilePath = options.sourceFilePath;
    this.targetFilePath = options.targetFilePath;
  }

  get sourceFilePathMatchExpression() {
    return new RegExp(`^${this.sourceFilePath}$`);
  }

  getBrowserifyBundle() {
    const b = browserify(this.options.options);

    const jadeRuntime = require.resolve('jade/runtime');

    const jadeifyOptions = {
      compileDebug: true,
      pretty: true,
      runtimePath: jadeRuntime
    };

    b.transform(jadeify, jadeifyOptions);

    return b;
  }

  compileChunk(chunk, cb) {
    const bundle = this.getBrowserifyBundle();

    bundle.add(resolve(this.sourceFilePath));

    bundle.on('bundle', bundleStream => {
      let data = '';

      bundleStream.on('data', d => {
        data += d;
      });

      bundleStream.on('end', () => {
        cb(null, data);
      });
    });

    bundle.bundle();
  }

  run(cb) {
    exists(this.sourceFilePath, (doesExist) => {
      if (doesExist) {
        this.compileFile(this.sourceFilePath, this.targetFilePath, cb);
      } else {
        logging.taskInfo(this.constructor.name, `skipping ${this.sourceFilePath} (Does not exist)`);
        cb();
      }
    });
  }
}

export default BrowserifyCompile;

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
