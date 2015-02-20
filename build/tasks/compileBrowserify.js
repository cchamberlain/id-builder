"use strict";

var compileAllFiles = require("../lib/browserify").compileAllFiles;
var dependencies = exports.dependencies = ["clean", "compileBabel", "compileCoffeescript", "compileCopy", "compileJade", "compileLess", "compileLivescript", "compileStylus"];

var run = exports.run = compileAllFiles;
Object.defineProperty(exports, "__esModule", {
  value: true
});