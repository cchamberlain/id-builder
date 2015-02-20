"use strict";

var clean = require("../lib/clean");

var dependencies = exports.dependencies = [];

var run = exports.run = function (options, cb) {
  clean.directory(options, cb);
};
Object.defineProperty(exports, "__esModule", {
  value: true
});