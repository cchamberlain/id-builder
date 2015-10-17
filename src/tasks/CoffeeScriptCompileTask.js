import CompileTask from '../lib/CompileTask';
import CoffeeScriptCompiler from '../compilers/CoffeeScriptCompiler';

class CoffeeScriptCompileTask extends CompileTask {
  constructor(options = {}) {
    super(options);

    this.setCompiler(CoffeeScriptCompiler);
  }

  run(cb) {
    this.compileAllFiles(cb);
  }
}

export default CoffeeScriptCompileTask;
