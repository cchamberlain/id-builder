"use strict";

var fileSystem = require("../lib/fileSystem");
var browserify  = require("../lib/browserify");

var dependencies = [
  "clean",
  "compileCoffeescript",
  "compileJade",
  "compileLivescript"
];

var run = browserify.compileAllFiles;

module.exports = {
  dependencies: dependencies,
  run: run
};