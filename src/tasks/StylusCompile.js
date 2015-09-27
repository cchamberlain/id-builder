import { exists } from 'fs';
import { render } from 'stylus';

import logging from '../lib/logging';
import CompileTask from '../lib/CompileTask';

class StylusCompile extends CompileTask {
  constructor(options = {}) {
    super(options);

    this.sourceFilePath = options.sourceFilePath;
    this.targetFilePath = options.targetFilePath;
  }

  get sourceFilePathMatchExpression() {
    return new RegExp(`^${this.sourceFilePath}$`);
  }

  compileChunk(chunk, cb) {
    render(chunk, this.options.options, cb);
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

export default StylusCompile;
