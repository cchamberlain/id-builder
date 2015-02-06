"use strict";

let less = require("../lib/less");

module.exports = {
  dependencies: [ "clean" ],
  run: less.compileAllFiles
};