import log from 'loglevel';

import BabelCodeCompiler from '../compilers/BabelCodeCompiler';
import CompileTask from '../lib/CompileTask';

export default class BabelCodeCompileTask extends CompileTask {
  constructor(options = {}) {
    // log.debug(`BabelCodeCompileTask#constructor`);

    super(options);

    this.setCompiler(BabelCodeCompiler);
  }
}
