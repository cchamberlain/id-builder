import { compile } from 'LiveScript';

import Compiler from '../lib/Compiler';

class LiveScriptCompiler extends Compiler {
  compileChunk(chunk) {
    return new Promise((resolve, reject) => {
      try {
        resolve(compile(chunk, this.options.options));
      } catch (e) {
        reject(e);
      }
    });
  }
}

export default LiveScriptCompiler;
