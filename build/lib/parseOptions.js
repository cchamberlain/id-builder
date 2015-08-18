'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _import = require('lodash');

var _import2 = _interopRequireWildcard(_import);

function merge(x) {
  var y = arguments[1] === undefined ? {} : arguments[1];

  var z = {};

  _import2['default'].each(x, function (xValue, xKey) {
    var yValue = y[xKey];

    if (_import2['default'].isObject(xValue) && !_import2['default'].isArray(xValue)) {
      z[xKey] = merge(xValue, yValue);
    } else {
      if (!_import2['default'].isUndefined(yValue)) {
        z[xKey] = yValue;
      } else {
        z[xKey] = xValue;
      }
    }
  });

  return z;
}

exports['default'] = merge;
module.exports = exports['default'];