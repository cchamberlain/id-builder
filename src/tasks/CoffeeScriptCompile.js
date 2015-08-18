import { compile } from 'coffee-script';

import CompileTask from '../lib/CompileTask';

class CoffeeScriptCompile extends CompileTask {
  constructor(options = {}) {
    super(options);

    this.dependencies = ['DirectoryCleaner'];
  }

  compileChunk(chunk, cb) {
    try {
      cb(null, compile(chunk, this.options.options));
    } catch (e) {
      return cb(e);
    }
  }

  run(cb) {
    this.compileAllFiles(cb);
  }
}

export default CoffeeScriptCompile;
