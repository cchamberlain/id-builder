class Compiler {
  constructor(options = {}) {
    this.options = options;
  }

  compileChunk(chunk) {
    return new Promise((resolve) => {
      resolve(chunk);
    });
  }
}

export default Compiler;
