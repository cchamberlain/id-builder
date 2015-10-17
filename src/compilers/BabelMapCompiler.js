import { transform } from 'babel';

import Compiler from '../lib/Compiler';

class BabelMapCompiler extends Compiler {
  compileChunk(chunk, sourceFilePath) {
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

export default BabelMapCompiler;
