import fs from 'fs';

import log from 'loglevel';

import CompileTask from '../lib/CompileTask';
import logging from '../lib/logging';
import promise from '../lib/promise';

import LessCompiler from '../compilers/LessCompiler';

export default class LessCompileTask extends CompileTask {
  constructor(options = {}) {
    super(options);

    this.sourceFilePath = this.configuration.sourceFilePath;
    this.targetFilePath = this.configuration.targetFilePath;

    this.setCompiler(LessCompiler);
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
    await this.compileFile();
  }
}
