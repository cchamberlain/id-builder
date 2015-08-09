'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _coffeescript = require('../lib/coffeescript');

var _coffeescript2 = _interopRequireWildcard(_coffeescript);

var dependencies = ['clean'];

var run = _coffeescript2['default'].compileAllFiles;

exports['default'] = {
  dependencies: dependencies,
  run: run
};
module.exports = exports['default'];