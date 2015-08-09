'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});
// TODO: before program exit clean up children.

var _servers = require('../lib/servers');

var _servers2 = _interopRequireWildcard(_servers);

var dependencies = ['compileBabel', 'compileBrowserify', 'compileCoffeescript', 'compileCopy',
// 'compileJade',
'compileLess', 'compileLivescript', 'compileStylus'];

var run = _servers2['default'].runServers;

exports['default'] = {
  dependencies: dependencies,
  run: run
};
module.exports = exports['default'];