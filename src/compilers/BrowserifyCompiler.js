import browserify from 'browserify';
import jadeify from 'jadeify';
import path from 'path';
import log from 'loglevel';

import Compiler from '../lib/Compiler';

class BrowserifyCompiler extends Compiler {
  constructor(options = {}) {
    super(options);

    this.sourceFilePath = options.sourceFilePath;
    this.targetFilePath = options.targetFilePath;

    this.bundle = browserify(this.options.options);

    this.bundle.transform(jadeify, {
      compileDebug: true,
      pretty: true,
      runtimePath: require.resolve('jade/runtime')
    });
  }

  compileChunk(chunk, sourceFilePath) {
    return new Promise((resolve, reject) => {
      const bundle = this.bundle;

      bundle.add(path.resolve(sourceFilePath));

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
