import { transform } from 'babel';

import Compiler from '../lib/Compiler';

class BabelCompiler extends Compiler {
  constructor(options = {}) {
    super(options);
  }

  compileChunk(chunk) {
    return new Promise((resolve, reject) => {
      try {
        resolve(transform(chunk, this.options.options).code);
      } catch (e) {
        reject(e);
      }
    });
  }
}

export default BabelCompiler;
