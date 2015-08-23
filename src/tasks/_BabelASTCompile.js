import { transform } from 'babel';
import circularJSON from 'circular-json';

import CompileTask from '../lib/CompileTask';

class BabelASTCompile extends CompileTask {
  compileChunk(chunk, cb) {
    try {
      const ast = transform(chunk, this.options.options).ast;

      cb(null, circularJSON.stringify(ast));
    } catch (e) {
      return cb(e);
    }
  }

  run(cb) {
    this.compileAllFiles(cb);
  }
}

export default BabelASTCompile;
