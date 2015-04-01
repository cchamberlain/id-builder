"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
"use strict";

// TODO: before program exit clean up children.

var runServers = require("../lib/servers").runServers;

var log = _interopRequire(require("loglevel"));

var dependencies = ["compileBabel", "compileBrowserify", "compileCoffeescript", "compileCopy", "compileJade", "compileLess", "compileLivescript", "compileStylus"];

exports.dependencies = dependencies;
var run = runServers;
exports.run = run;