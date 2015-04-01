"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
"use strict";

var log = _interopRequire(require("loglevel"));

var watch = require("../lib/browserify").watch;

var dependencies = ["runTests"];

exports.dependencies = dependencies;
var run = watch;
exports.run = run;