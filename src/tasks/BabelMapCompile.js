import { transform } from 'babel';

import CompileTask from '../lib/CompileTask';

class BabelMapCompile extends CompileTask {
  compileChunk(chunk, cb) {
    try {
      const transformResult = transform(chunk, this.options.options);
      const jsonResult = JSON.stringify(transformResult.map);

      cb(null, jsonResult);
    } catch (e) {
      return cb(e);
    }
  }

  run(cb) {
    this.compileAllFiles(cb);
  }
}

export default BabelMapCompile;
