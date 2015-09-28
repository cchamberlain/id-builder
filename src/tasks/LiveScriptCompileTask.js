import CompileTask from '../lib/CompileTask';

import LiveScriptCompiler from '../compilers/LiveScriptCompiler';

class LiveScriptCompileTask extends CompileTask {
  constructor(options = {}) {
    super(options);

    this.setCompiler(LiveScriptCompiler);
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
