"use strict";

var stylus = require("../lib/stylus");

module.exports = {
  dependencies: ["clean"],
  run: stylus.compileAllFiles
};