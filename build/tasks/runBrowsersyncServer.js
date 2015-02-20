"use strict";

var runServer = require("../lib/browsersync").runServer;
var dependencies = exports.dependencies = ["compileBrowserify", "compileCoffeescript", "compileCopy", "compileJade", "compileLess", "compileLivescript", "compileBabel", "compileStylus"];

var run = exports.run = runServer;
Object.defineProperty(exports, "__esModule", {
  value: true
});