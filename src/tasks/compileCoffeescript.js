"use strict";

var coffeescript = require("../lib/coffeescript")

module.exports = {
  dependencies: [ "clean" ],
  run: coffeescript.compileAllFiles
};