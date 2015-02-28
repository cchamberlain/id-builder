"use strict";

var compileFile = require("../lib/less").compileFile;
var dependencies = exports.dependencies = ["clean"];

var run = exports.run = function (options, cb) {
  compileFile(options, options.sourcePath, options.targetPath, cb);
};
Object.defineProperty(exports, "__esModule", {
  value: true
});