"use strict";

let async = require("async");

let coffeescript = require("../lib/coffeescript")

module.exports = {
  dependencies: [ "clean" ],
  run: coffeescript.compileAllFiles
};