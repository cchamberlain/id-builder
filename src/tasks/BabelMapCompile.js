import { transform } from 'babel';

import CompileTask from '../lib/CompileTask';

class BabelMapCompile extends CompileTask {
  compileChunk(chunk, cb) {
    try {
      cb(null, transform(chunk, this.options.options).map);
    } catch (e) {
      return cb(e);
    }
  }

  run(cb) {
    this.compileAllFiles(cb);
  }
}

export default BabelMapCompile;
