"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var log = _interopRequire(require("loglevel"));

var runServer = require("../lib/browsersync").runServer;
var dependencies = exports.dependencies = ["compileBabel", "compileBrowserify", "compileCoffeescript", "compileCopy", "compileJade", "compileLess", "compileLivescript", "compileStylus"];

var run = exports.run = runServer;
Object.defineProperty(exports, "__esModule", {
  value: true
});