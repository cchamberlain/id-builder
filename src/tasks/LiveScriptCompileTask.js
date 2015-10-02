import CompileTask from '../lib/CompileTask';

import LiveScriptCompiler from '../compilers/LiveScriptCompiler';

class LiveScriptCompileTask extends CompileTask {
  constructor(options = {}) {
    super(options);

    this.setCompiler(LiveScriptCompiler);
  }

  run(cb) {
    this.compileAllFiles(cb);
  }
}

export default LiveScriptCompileTask;
