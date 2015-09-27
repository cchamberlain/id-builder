import { transform } from 'babel';

import Compiler from '../lib/Compiler';

class BabelCodeCompiler extends Compiler {
  compileChunk(chunk) {
    return new Promise((resolve, reject) => {
      try {
        const transformResult = transform(chunk, this.options.options);
        const jsonResult = JSON.stringify(transformResult.map);

        resolve(jsonResult);
      } catch (e) {
        reject(e);
      }
    });
  }
}

export default BabelCodeCompiler;
