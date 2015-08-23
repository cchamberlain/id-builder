import { parse } from 'esprima';

import CompileTask from '../lib/CompileTask';
class EsprimaCompile extends CompileTask {
  compileChunk(chunk, cb) {
    if (!chunk.length) {
      return cb('Input file is empty.');
    }

    try {
      const result = parse(chunk);

      if (!result) {
        return cb('Compile error');
      }

      console.log('result!', result);

      cb(null, result);
    } catch(e) {
      cb(e);
    }
  }

  run(cb) {
    this.compileAllFiles(cb);
  }
}

export default EsprimaCompile;
