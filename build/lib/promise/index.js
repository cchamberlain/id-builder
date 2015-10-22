'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _promiseFromCallback = require('./promiseFromCallback');

var _promiseFromCallback2 = _interopRequireDefault(_promiseFromCallback);

var _promiseFromNodeCallback = require('./promiseFromNodeCallback');

var _promiseFromNodeCallback2 = _interopRequireDefault(_promiseFromNodeCallback);

exports['default'] = {
  promiseFromCallback: _promiseFromCallback2['default'],
  promiseFromNodeCallback: _promiseFromNodeCallback2['default']
};
module.exports = exports['default'];