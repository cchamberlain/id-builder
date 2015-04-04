'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

// TODO: before program exit clean up children.

var _runServers = require('../lib/servers');

var _log = require('loglevel');

var _log2 = _interopRequireWildcard(_log);

'use strict';var dependencies = ['compileBabel', 'compileBrowserify', 'compileCoffeescript', 'compileCopy',
//'compileJade',
'compileLess', 'compileLivescript', 'compileStylus'];

exports.dependencies = dependencies;
var run = _runServers.runServers;
exports.run = run;