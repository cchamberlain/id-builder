"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var log = _interopRequire(require("loglevel"));

var compileAllFiles = require("../lib/coffeescript").compileAllFiles;
var dependencies = exports.dependencies = ["clean"];

var run = exports.run = compileAllFiles;
Object.defineProperty(exports, "__esModule", {
  value: true
});