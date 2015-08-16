import { each } from 'async';
import rimraf from 'rimraf';

import babel from '../lib/babel';
import CompileTask from '../lib/CompileTask';

class BabelCompile extends CompileTask {
  constructor(options = {}) {
    super(options);

    this.dependencies = ['DirectoryCleaner'];
  }

  compileChunk() {
  }

  run(options, cb) {
    each(options.paths, (path, cb) => {
      rimraf(path, cb);
    }, cb);
  }
}

// TODO: Refactor this into the CompileTask implementation;
BabelCompile.prototype.run = babel.compileAllFiles;

export default BabelCompile;
