import BabelMapCompiler from '../compilers/BabelMapCompiler';
import CompileTask from '../lib/CompileTask';

class BabelMapCompileTask extends CompileTask {
  constructor(options = {}) {
    super(options);

    this.setCompiler(BabelMapCompiler);
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

export default BabelMapCompileTask;
