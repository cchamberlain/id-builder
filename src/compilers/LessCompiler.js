import log from 'loglevel';
import less from 'less';

import Compiler from '../lib/Compiler';

class LessCompiler extends Compiler {
  compileChunk(chunk, sourceFilePath) {
    return new Promise((resolve, reject) => {
      less.render(chunk, this.options, (e, result) => {
        if (e) {
          return reject(e);
        }

        return resolve(result.css);
      });
    });
  }
}

export default LessCompiler;
