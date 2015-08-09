'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _logging = require('../lib/logging');

var _logging2 = _interopRequireWildcard(_logging);

var _webpack = require('../lib/webpack');

var _webpack2 = _interopRequireWildcard(_webpack);

var dependencies = ['compileBabel', 'compileCoffeescript', 'compileCopy', 'compileLess', 'compileLivescript', 'compileStylus'];

var run = _webpack2['default'].compileAllFiles;

exports['default'] = {
  dependencies: dependencies,
  run: run
};
module.exports = exports['default'];