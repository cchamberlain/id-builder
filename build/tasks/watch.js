"use strict";

var start = require("../lib/watch").start;
var dependencies = exports.dependencies = ["runTests"];

var run = exports.run = function (options, cb) {
  start(options);
  cb();
};
Object.defineProperty(exports, "__esModule", {
  value: true
});