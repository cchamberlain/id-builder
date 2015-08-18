'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _tests = require('../lib/tests');

var _tests2 = _interopRequireWildcard(_tests);

var dependencies = ['compileBabel', 'compileBrowserify', 'compileCoffeescript', 'compileCopy',
// 'compileJade',
'compileLess', 'compileLivescript', 'compileStylus'];

var run = _tests2['default'].runTests;

exports['default'] = {
  dependencies: dependencies,
  run: run
};
module.exports = exports['default'];