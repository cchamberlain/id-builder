"use strict";

let tests = require("../lib/tests");

module.exports = {
  dependencies: [
    "compileBrowserify",
    "compileCoffeescript",
    "compileCopy",
    "compileJade",
    "compileLess",
    "compileLivescript",
    "compileStylus"
  ],
  run: tests.runTests
};