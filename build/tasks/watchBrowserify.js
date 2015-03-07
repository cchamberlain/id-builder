"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var log = _interopRequire(require("loglevel"));

var watch = require("../lib/browserify").watch;
var dependencies = exports.dependencies = ["runTests"];

var run = exports.run = watch;
Object.defineProperty(exports, "__esModule", {
  value: true
});