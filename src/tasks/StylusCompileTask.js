import { exists } from 'fs';

import logging from '../lib/logging';
import CompileTask from '../lib/CompileTask';

import StylusCompiler from '../compilers/StylusCompiler';

class StylusCompileTask extends CompileTask {
  constructor(options = {}) {
    super(options);

    this.sourceFilePath = options.sourceFilePath;
    this.targetFilePath = options.targetFilePath;

    this.setCompiler(StylusCompiler);
  }

  get sourceFilePathMatchExpression() {
    return new RegExp(`^${this.sourceFilePath}$`);
  }

  compileFile(sourceFilePath = this.sourceFilePath, targetFilePath = this.targetFilePath, cb) {
    exists(sourceFilePath, (doesExist) => {
      if (doesExist) {
        super.compileFile(sourceFilePath, targetFilePath, cb);
      } else {
        logging.taskInfo(this.constructor.name, `skipping ${sourceFilePath} (Does not exist)`);
        cb();
      }
    });
  }

  run(cb) {
    this.compileFile(this.sourceFilePath, this.targetFilePath, cb);
  }
}

export default StylusCompileTask;
