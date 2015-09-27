import { exists } from 'fs';

import logging from '../lib/logging';
import CompileTask from '../lib/CompileTask';

import LessCompiler from '../compilers/LessCompiler';

class LessCompileTask extends CompileTask {
  constructor(options = {}) {
    super(options);

    this.sourceFilePath = options.sourceFilePath;
    this.targetFilePath = options.targetFilePath;

    this.compiler = new LessCompiler({
      options: this.options.options
    });
  }

  get sourceFilePathMatchExpression() {
    return new RegExp(`^${this.sourceFilePath}$`);
  }

  compileChunk(chunk, cb) {
    this.compiler.compileChunk(chunk)
      .then((result) => {
        cb(null, result);
      })
      .catch(cb);
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

export default LessCompileTask;
