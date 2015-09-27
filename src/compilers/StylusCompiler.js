import { render } from 'stylus';

import Compiler from '../lib/Compiler';

class StylusCompiler extends Compiler {
  compileChunk(chunk) {
    return new Promise((resolve, reject) => {
      render(chunk, this.options.options, (e, result) => {
        if (e) {
          return reject(e);
        }

        return resolve(result);
      });
    });
  }
}

export default StylusCompiler;
