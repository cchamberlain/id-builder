"use strict";

let copy = require("../lib/copy");

module.exports = {
  dependencies: [ "clean" ],
  run: copy.copyAllFiles
};