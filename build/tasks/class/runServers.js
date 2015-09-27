// TODO: before program exit clean up children.
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libServers = require('../lib/servers');

var _libServers2 = _interopRequireDefault(_libServers);

var dependencies = ['compileBabel', 'compileBrowserify', 'compileCoffeescript', 'compileCopy',
// 'compileJade',
'compileLess', 'compileLivescript', 'compileStylus'];

var run = _libServers2['default'].runServers;

exports['default'] = {
  dependencies: dependencies,
  run: run
};
module.exports = exports['default'];