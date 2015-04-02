'use strict';

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _log = require('loglevel');

var log = _interopRequire(_log);

var _runTests = require('../lib/tests');

'use strict';

var dependencies = ['compileBabel', 'compileBrowserify', 'compileCoffeescript', 'compileCopy', 'compileJade', 'compileLess', 'compileLivescript', 'compileStylus'];

exports.dependencies = dependencies;
var run = _runTests.runTests;
exports.run = run;