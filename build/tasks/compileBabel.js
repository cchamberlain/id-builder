"use strict";

var compileAllFiles = require("../lib/babel").compileAllFiles;
var dependencies = exports.dependencies = ["clean"];

var run = exports.run = compileAllFiles;
Object.defineProperty(exports, "__esModule", {
  value: true
});