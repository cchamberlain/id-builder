"use strict";

var sixToFive = require("../lib/sixToFive");

module.exports = {
  dependencies: ["clean"],
  run: sixToFive.compileAllFiles
};