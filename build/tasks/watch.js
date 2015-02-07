"use strict";

let watch = require("../lib/watch");

let run = function(options, cb) {
  watch.start(options);
  cb();
};

module.exports = {
  dependencies: [ "runTests" ],
  run: run
};