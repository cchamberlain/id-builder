"use strict";

var copyAllFiles = require("../lib/copy").copyAllFiles;
var dependencies = exports.dependencies = ["clean"];

var run = exports.run = copyAllFiles;
Object.defineProperty(exports, "__esModule", {
  value: true
});