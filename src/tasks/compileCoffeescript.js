"use strict";

let coffeescript = require("../lib/coffeescript")

module.exports = {
  dependencies: [ "clean" ],
  run: coffeescript.compileAllFiles
};