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

    this.dependencies = [
      'BabelCompile',
      'CoffeeScriptCompile',
      'LessCompile',
      'LiveScriptCompile'
    ];
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
