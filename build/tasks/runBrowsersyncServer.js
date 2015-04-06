'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _log = require('loglevel');

var _log2 = _interopRequireWildcard(_log);

var _runServer = require('../lib/browsersync');

'use strict';

var dependencies = ['compileBabel', 'compileBrowserify', 'compileCoffeescript', 'compileCopy', 'compileLess', 'compileLivescript', 'compileStylus'];

var run = _runServer.runServer;

exports['default'] = {
  dependencies: dependencies,
  run: run
};
module.exports = exports['default'];