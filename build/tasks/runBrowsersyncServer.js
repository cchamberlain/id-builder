"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
"use strict";

var log = _interopRequire(require("loglevel"));

var runServer = require("../lib/browsersync").runServer;

var dependencies = ["compileBabel", "compileBrowserify", "compileCoffeescript", "compileCopy", "compileJade", "compileLess", "compileLivescript", "compileStylus"];

exports.dependencies = dependencies;
var run = runServer;
exports.run = run;