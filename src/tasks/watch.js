"use strict";

var watch = require("../lib/watch");

var run = function(options, cb) {
  watch.start(options);
  cb();
};

module.exports = {
  dependencies: [ "runTests" ],
  run: run
};