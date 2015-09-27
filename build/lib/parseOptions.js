'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function merge(x) {
  var y = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var z = {};

  _lodash2['default'].each(x, function (xValue, xKey) {
    var yValue = y[xKey];

    if (_lodash2['default'].isObject(xValue) && !_lodash2['default'].isArray(xValue)) {
      z[xKey] = merge(xValue, yValue);
    } else {
      if (!_lodash2['default'].isUndefined(yValue)) {
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