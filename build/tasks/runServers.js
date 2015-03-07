"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

// TODO: before program exit clean up children.
var runServers = require("../lib/servers").runServers;
var log = _interopRequire(require("loglevel"));

var dependencies = exports.dependencies = ["compileBabel", "compileBrowserify", "compileCoffeescript", "compileCopy", "compileJade", "compileLess", "compileLivescript", "compileStylus"];

var run = exports.run = runServers;
Object.defineProperty(exports, "__esModule", {
  value: true
});