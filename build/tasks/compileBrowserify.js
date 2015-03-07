"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var log = _interopRequire(require("loglevel"));

var compileAllFiles = require("../lib/browserify").compileAllFiles;
var dependencies = exports.dependencies = ["compileBabel", "compileCoffeescript", "compileCopy", "compileJade", "compileLess", "compileLivescript", "compileStylus"];

var run = exports.run = compileAllFiles;
Object.defineProperty(exports, "__esModule", {
  value: true
});