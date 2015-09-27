'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libTests = require('../lib/tests');

var _libTests2 = _interopRequireDefault(_libTests);

var dependencies = ['compileBabel', 'compileBrowserify', 'compileCoffeescript', 'compileCopy',
// 'compileJade',
'compileLess', 'compileLivescript', 'compileStylus'];

var run = _libTests2['default'].runTests;

exports['default'] = {
  dependencies: dependencies,
  run: run
};
module.exports = exports['default'];