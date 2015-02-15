"use strict";

const sixToFive = require("../lib/sixToFive")

module.exports = {
  dependencies: [ "clean" ],
  run: sixToFive.compileAllFiles
};