import { render } from 'less';

import Compiler from '../lib/Compiler';

class LessCompiler extends Compiler {
  compileChunk(chunk, sourceFilePath) {
    return new Promise((resolve, reject) => {
      render(chunk, this.options.options, (e, result) => {
        if (e) {
          return reject(e);
        }

        return resolve(result.css);
      });
    });
  }
}

export default LessCompiler;
