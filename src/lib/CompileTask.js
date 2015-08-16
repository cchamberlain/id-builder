import fileSystem from './fileSystem';

import Task from './Task';

class CompileTask extends Task {
  constructor(options = {}) {
    super(options);

    this.sourceFileExtension = options.sourceFileExtension;
    this.targetFileExtension = options.targetFileExtension;
    this.sourceDirectoryPath = options.sourceDirectoryPath;
    this.targetDirectoryPath = options.targetDirectoryPath;
  }

  get sourceFilePathMatchExpression() {
    return new RegExp(`^${this.sourceDirectoryPath}.+\\.${this.sourceExtension}$`);
  }

  sourceFilePathMatches(options, sourceFilePath) {
    return !!sourceFilePath.match(this.sourceFilePathMatchExpression);
  }

  compileChunk() {
  }

  compileFile() {
  }

  compileAllFiles() {
  }

  run(options, cb) {
    this.compileAllFiles(cb);
  }
}

export default CompileTask;
