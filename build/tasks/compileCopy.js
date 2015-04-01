"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
"use strict";

var log = _interopRequire(require("loglevel"));

var copyAllFiles = require("../lib/copy").copyAllFiles;

var dependencies = ["clean"];

exports.dependencies = dependencies;
var run = copyAllFiles;
exports.run = run;