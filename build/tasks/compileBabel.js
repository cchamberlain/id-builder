"use strict";

var babel = require("../lib/babel");

module.exports = {
  dependencies: ["clean"],
  run: babel.compileAllFiles
};