'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireWildcard(_deepmerge);

var _import = require('./log');

var log = _interopRequireWildcard(_import);

'use strict';

exports['default'] = function (defaults, options) {
  return _deepmerge2['default'](defaults, options);
};

;
module.exports = exports['default'];