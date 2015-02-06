var clean = require("../lib/clean");

var dependencies = []

var run = function (options, cb) {
  clean.directory(options, cb);
};

module.exports = {
  dependencies: dependencies,
  run: run
};