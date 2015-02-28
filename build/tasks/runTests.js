"use strict";

var runTests = require("../lib/tests").runTests;
var dependencies = exports.dependencies = ["compileBabel",
//'compileBrowserify',
"compileCoffeescript", "compileCopy", "compileJade", "compileLess", "compileLivescript", "compileStylus"];

var run = exports.run = runTests;
Object.defineProperty(exports, "__esModule", {
  value: true
});