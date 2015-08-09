'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _browsersync = require('../lib/browsersync');

var _browsersync2 = _interopRequireWildcard(_browsersync);

var dependencies = ['compileBabel', 'compileBrowserify', 'compileCoffeescript', 'compileCopy', 'compileLess', 'compileLivescript', 'compileStylus'];

var run = _browsersync2['default'].runServer;

exports['default'] = {
  dependencies: dependencies,
  run: run
};
module.exports = exports['default'];