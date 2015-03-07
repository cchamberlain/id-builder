"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var log = _interopRequire(require("loglevel"));

var start = require("../lib/watch").start;
var dependencies = exports.dependencies = ["runTests"];

var run = exports.run = function (options, cb) {
  start(options);
  cb();
};
Object.defineProperty(exports, "__esModule", {
  value: true
});