"use strict";

const fileSystem = require("../lib/fileSystem");
const browserify  = require("../lib/browserify");

const dependencies = [
  "clean",
  "compileCoffeescript",
  "compileJade",
  "compileLivescript"
];

const run = browserify.compileAllFiles;

module.exports = {
  dependencies: dependencies,
  run: run
};