import BabelCodeCompiler from '../compilers/BabelCodeCompiler';
import CompileTask from '../lib/CompileTask';

class BabelCodeCompileTask extends CompileTask {
  constructor(options = {}) {
    super(options);

    this.setCompiler(BabelCodeCompiler);
  }

  run(cb) {
    this.compileAllFiles(cb);
  }
}

export default BabelCodeCompileTask;
