"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
"use strict";

var log = _interopRequire(require("loglevel"));

var directory = require("../lib/clean").directory;

var dependencies = [];

exports.dependencies = dependencies;
var run = function run(options, cb) {
  directory(options, cb);
};
exports.run = run;