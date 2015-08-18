import { exists } from 'fs';
import { render } from 'less';

import logging from '../lib/logging';
import CompileTask from '../lib/CompileTask';

class LessCompile extends CompileTask {
  constructor(options = {}) {
    super(options);

    this.sourceFilePath = options.sourceFilePath;
    this.targetFilePath = options.targetFilePath;
  }

  get sourceFilePathMatchExpression() {
    return new RegExp(`^${this.sourceFilePath}$`);
  }

  compileChunk(chunk, cb) {
    render(chunk, this.options.options, (e, result) => {
      if (e) {
        return cb(e);
      }

      return cb(null, result.css);
    });
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

export default LessCompile;
