"use strict";

// TODO: before program exit clean up children.
var runServers = require("../lib/servers").runServers;
var dependencies = exports.dependencies = ["compileBabel",
//'compileBrowserify',
"compileCoffeescript", "compileCopy", "compileJade", "compileLess", "compileLivescript", "compileStylus"];

var run = exports.run = runServers;
Object.defineProperty(exports, "__esModule", {
  value: true
});