"use strict";

let clean = require("../lib/clean");

let dependencies = []

let run = function (options, cb) {
  clean.directory(options, cb);
};

module.exports = {
  dependencies: dependencies,
  run: run
};