'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _browserify = require('../lib/browserify');

var _browserify2 = _interopRequireWildcard(_browserify);

var dependencies = ['compileBabel', 'compileCoffeescript', 'compileCopy', 'compileLess', 'compileLivescript', 'compileStylus'];

var run = _browserify2['default'].compileAllFiles;

exports['default'] = {
  dependencies: dependencies,
  run: run
};
module.exports = exports['default'];