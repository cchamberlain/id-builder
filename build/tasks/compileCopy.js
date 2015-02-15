"use strict";

var copy = require("../lib/copy");

module.exports = {
  dependencies: ["clean"],
  run: copy.copyAllFiles
};