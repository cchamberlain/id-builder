import BabelCodeCompiler from '../compilers/BabelCodeCompiler';
import CompileTask from '../lib/CompileTask';

class BabelCodeCompileTask extends CompileTask {
  constructor(options = {}) {
    super(options);

    this.compiler = new BabelCodeCompiler();
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

export default BabelCodeCompileTask;
