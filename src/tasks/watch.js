"use strict";

let watch = require("../lib/watch");

let dependencies = [ "runTests" ]

let run = function(options, cb) {
  watch.start(options);
  cb();
};

module.exports = {
  dependencies: dependencies,
  run: run
};