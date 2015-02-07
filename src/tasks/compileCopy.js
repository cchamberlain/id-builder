"use strict";

const copy = require("../lib/copy");

module.exports = {
  dependencies: [ "clean" ],
  run: copy.copyAllFiles
};