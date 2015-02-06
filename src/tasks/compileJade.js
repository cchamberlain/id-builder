"use strict";

let jade = require("../lib/jade");

module.exports = {
  dependencies: [ "clean" ],
  run: jade.compileAllFiles
};