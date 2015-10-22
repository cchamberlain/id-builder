import fs from 'fs';

import log from 'loglevel';

import promise from '../lib/promise';
import logging from '../lib/logging';
import CompileTask from '../lib/CompileTask';

import StylusCompiler from '../compilers/StylusCompiler';

export default class StylusCompileTask extends CompileTask {
  constructor(options = {}) {
    super(options);

    this.sourceFilePath = this.configuration.sourceFilePath;
    this.targetFilePath = this.configuration.targetFilePath;

    this.setCompiler(StylusCompiler);
  }

  get sourceFilePathMatchExpression() {
    return new RegExp(`^${this.sourceFilePath}$`);
  }

  async compileFile(sourceFilePath = this.sourceFilePath, targetFilePath = this.targetFilePath) {
    const doesExist = await promise.promiseFromCallback(fs.exists, sourceFilePath);

    if (!doesExist) {
      logging.taskInfo(this.constructor.name, `skipping ${sourceFilePath} (Does not exist)`);

      return;
    }

    await super.compileFile(sourceFilePath, targetFilePath);
  }

  async run() {
    await this.compileFile(this.sourceFilePath, this.targetFilePath);
  }
}
