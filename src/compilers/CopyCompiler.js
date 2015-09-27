import Compiler from '../lib/Compiler';

class CopyCompiler extends Compiler {
  compileChunk(chunk) {
    return new Promise((resolve) => {
      resolve(chunk);
    });
  }
}

export default CopyCompiler;
