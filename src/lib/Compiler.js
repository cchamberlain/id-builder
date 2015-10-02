class Compiler {
  constructor(options = {}) {
    this.options = options;
  }

  compileChunk(chunk, sourceFilePath) {
    return new Promise((resolve) => {
      resolve(chunk);
    });
  }
}

export default Compiler;
