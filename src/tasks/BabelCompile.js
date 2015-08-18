import { transform } from 'babel';

import CompileTask from '../lib/CompileTask';

class BabelCompile extends CompileTask {
  constructor(options = {}) {
    super(options);

    this.dependencies = ['DirectoryCleaner'];
  }

  compileChunk(chunk, cb) {
    try {
      cb(null, transform(chunk, this.options.options).code);
    } catch (e) {
      return cb(e);
    }
  }

  run(cb) {
    this.compileAllFiles(cb);
  }
}

export default BabelCompile;
