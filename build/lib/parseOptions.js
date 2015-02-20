"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var deepmerge = _interopRequire(require("deepmerge"));

module.exports = function (defaults, options) {
  return deepmerge(defaults, options);
};