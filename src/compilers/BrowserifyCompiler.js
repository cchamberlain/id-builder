import _ from 'lodash';
import browserify from 'browserify';
import jadeify from 'jadeify';
import path from 'path';
import log from 'loglevel';

import Compiler from '../lib/Compiler';

class BrowserifyCompiler extends Compiler {
  constructor(options = {}) {
    super(options);

    _.bindAll(this, [
      'handleBundleDependency'
    ]);

    this.sourceFilePath = options.sourceFilePath;
    this.targetFilePath = options.targetFilePath;

    this.setBundle();
  }

  setBundle() {
    this.bundle = browserify(this.options.options);
    this.bundleDependencies = [];

    this.bundle.on('dep', this.handleBundleDependency);

    this.bundle.transform(jadeify, {
      compileDebug: true,
      pretty: true,
      runtimePath: require.resolve('jade/runtime')
    });
  }

  hasDependency(_dependencyPath) {
    const dependencyPath = path.resolve(_dependencyPath);

    return _(this.bundleDependencies)
      .contains(dependencyPath);
  }

  addDependency(path) {
    this.bundleDependencies = _(this.bundleDependencies)
      .union([ path ])
      .value();
  }

  removeDependency(path) {
    this.bundleDependencies = _(this.bundleDependencies)
      .without(path)
      .value();
  }

  handleBundleDependency({ file }) {
    this.addDependency(file);
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
