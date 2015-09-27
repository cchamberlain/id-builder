import browserify from 'browserify';
import jadeify from 'jadeify';
import path from 'path';

import Compiler from '../lib/Compiler';

class BrowserifyCompiler extends Compiler {
  constructor(options = {}) {
    super(options);

    this.sourceFilePath = options.sourceFilePath;
    this.targetFilePath = options.targetFilePath;
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

  compileChunk(chunk) {
    return new Promise((resolve, reject) => {
      const bundle = this.getBrowserifyBundle();

      bundle.add(path.resolve(this.sourceFilePath));

      bundle.on('bundle', bundleStream => {
        let data = '';

        bundleStream.on('data', d => {
          data += d;
        });

        bundleStream.on('end', () => {
          resolve(data);
        });
      });

      bundle.bundle();
    });
  }
}

export default BrowserifyCompiler;
