'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _copy = require('../lib/copy');

var _copy2 = _interopRequireWildcard(_copy);

var dependencies = ['clean'];

var run = _copy2['default'].copyAllFiles;

exports['default'] = {
  dependencies: dependencies,
  run: run
};
module.exports = exports['default'];