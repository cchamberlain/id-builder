"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var log = _interopRequire(require("loglevel"));

var copyAllFiles = require("../lib/copy").copyAllFiles;
var dependencies = exports.dependencies = ["clean"];

var run = exports.run = copyAllFiles;
Object.defineProperty(exports, "__esModule", {
  value: true
});