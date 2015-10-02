import Compiler from '../lib/Compiler';

class CopyCompiler extends Compiler {
  compileChunk(chunk, sourceFilePath) {
    return new Promise((resolve) => {
      resolve(chunk);
    });
  }
}

export default CopyCompiler;
