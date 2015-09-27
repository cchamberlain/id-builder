import CompileTask from '../lib/CompileTask';

import LiveScriptCompiler from '../compilers/LiveScriptCompiler';

class LiveScriptCompileTask extends CompileTask {
  constructor(options = {}) {
    super(options);

    this.compiler = new LiveScriptCompiler({
      options: this.options.options
    });
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

export default LiveScriptCompileTask;
