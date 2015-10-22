import log from 'loglevel';

import CompileTask from '../lib/CompileTask';

import LiveScriptCompiler from '../compilers/LiveScriptCompiler';

export default class LiveScriptCompileTask extends CompileTask {
  constructor(options = {}) {
    super(options);

    this.setCompiler(LiveScriptCompiler);
  }
}
