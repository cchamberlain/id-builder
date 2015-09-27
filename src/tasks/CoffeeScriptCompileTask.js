import CompileTask from '../lib/CompileTask';
import CoffeeScriptCompiler from '../compilers/CoffeeScriptCompiler';

class CoffeeScriptCompileTask extends CompileTask {
  constructor(options = {}) {
    super(options);

    this.compiler = new CoffeeScriptCompiler();
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

export default CoffeeScriptCompileTask;
