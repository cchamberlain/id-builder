"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var deepmerge = _interopRequire(require("deepmerge"));

var log = _interopRequireWildcard(require("./log"));

module.exports = function (defaults, options) {
  return deepmerge(defaults, options);
};