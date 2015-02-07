"use strict";

let fileSystem = require("../lib/fileSystem");
let browserify  = require("../lib/browserify");

let dependencies = [
  "clean",
  "compileCoffeescript",
  "compileJade",
  "compileLivescript"
];

let run = browserify.compileAllFiles;

module.exports = {
  dependencies: dependencies,
  run: run
};