import BabelMapCompiler from '../compilers/BabelMapCompiler';
import CompileTask from '../lib/CompileTask';

class BabelMapCompileTask extends CompileTask {
  constructor(options = {}) {
    super(options);

    this.setCompiler(BabelMapCompiler);
  }

  run(cb) {
    this.compileAllFiles(cb);
  }
}

export default BabelMapCompileTask;
