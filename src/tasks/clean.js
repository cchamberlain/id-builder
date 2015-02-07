"use strict";

const clean = require("../lib/clean");

const dependencies = []

const run = function (options, cb) {
  clean.directory(options, cb);
};

module.exports = {
  dependencies: dependencies,
  run: run
};