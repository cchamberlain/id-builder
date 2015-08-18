'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _livescript = require('../lib/livescript');

var _livescript2 = _interopRequireWildcard(_livescript);

var dependencies = ['clean'];

var run = _livescript2['default'].compileAllFiles;

exports['default'] = {
  dependencies: dependencies,
  run: run
};
module.exports = exports['default'];