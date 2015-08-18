import { exists } from 'fs';
import { render } from 'stylus';

import logging from '../lib/logging';
import CompileTask from '../lib/CompileTask';

class StylusCompile extends CompileTask {
  constructor(options = {}) {
    super(options);

    this.sourceFilePath = options.sourceFilePath;
    this.targetFilePath = options.targetFilePath;

    this.dependencies = ['DirectoryCleaner'];
  }

  get sourceFilePathMatchExpression() {
    return new RegExp(`^${this.sourceFilePath}$`);
  }

  compileChunk(chunk, cb) {
    render(chunk, this.options.options, cb);
  }

  run(cb) {
    exists(this.sourceFilePath, (doesExist) => {
      if (doesExist) {
        this.compileFile(this.sourceFilePath, this.targetFilePath, cb);
      } else {
        logging.taskInfo(this.constructor.name, `skipping ${this.sourceFilePath} (Does not exist)`);
        cb();
      }
    });
  }
}

export default StylusCompile;
