"use strict";

var livescript = require("../lib/livescript");

module.exports = {
  dependencies: [ "clean" ],
  run: livescript.compileAllFiles
};