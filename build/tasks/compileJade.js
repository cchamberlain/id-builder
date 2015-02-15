"use strict";

var jade = require("../lib/jade");

module.exports = {
  dependencies: ["clean"],
  run: jade.compileAllFiles
};