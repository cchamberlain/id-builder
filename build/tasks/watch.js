"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
"use strict";

var log = _interopRequire(require("loglevel"));

var start = require("../lib/watch").start;

var dependencies = ["runTests"];

exports.dependencies = dependencies;
var run = function run(options, cb) {
  start(options);
  cb();
};
exports.run = run;