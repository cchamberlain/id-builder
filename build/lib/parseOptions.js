'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

var _deepmerge = require('deepmerge');

var deepmerge = _interopRequire(_deepmerge);

var _import = require('./log');

var log = _interopRequireWildcard(_import);

module.exports = function (defaults, options) {
  return deepmerge(defaults, options);
};

;