import BabelCompiler from '../compilers/BabelCompiler';
import CompileTask from '../lib/CompileTask';

class BabelCodeCompile extends CompileTask {
  constructor(options = {}) {
    super(options);

    this.compiler = new BabelCompiler();
  }

  compileChunk(chunk, cb) {
    this.compiler.compileChunk(chunk)
      .then((result) => {
        cb(null, result);
      })
      .catch(cb);
  }

  run(cb) {
    this.compileAllFiles(cb);
  }
}

export default BabelCodeCompile;
