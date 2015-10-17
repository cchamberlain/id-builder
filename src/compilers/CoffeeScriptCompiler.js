import { compile } from 'coffee-script';

import Compiler from '../lib/Compiler';

class BabelCodeCompiler extends Compiler {
  compileChunk(chunk, sourceFilePath) {
    return new Promise((resolve, reject) => {
      try {
        resolve(compile(chunk, this.options.options));
      } catch (e) {
        reject(e);
      }
    });
  }
}

export default BabelCodeCompiler;
