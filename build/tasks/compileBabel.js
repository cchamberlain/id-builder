'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _babel = require('../lib/babel');

var _babel2 = _interopRequireWildcard(_babel);

var dependencies = ['clean'];

var run = _babel2['default'].compileAllFiles;

exports['default'] = {
  dependencies: dependencies,
  run: run
};
module.exports = exports['default'];