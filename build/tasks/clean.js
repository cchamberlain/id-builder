"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var log = _interopRequire(require("loglevel"));

var directory = require("../lib/clean").directory;
var dependencies = exports.dependencies = [];

var run = exports.run = function (options, cb) {
  directory(options, cb);
};
Object.defineProperty(exports, "__esModule", {
  value: true
});