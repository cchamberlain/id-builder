import log from 'loglevel';

import CompileTask from '../lib/CompileTask';

import CoffeeScriptCompiler from '../compilers/CoffeeScriptCompiler';

export default class CoffeeScriptCompileTask extends CompileTask {
  constructor(options = {}) {
    super(options);

    this.setCompiler(CoffeeScriptCompiler);
  }
}
