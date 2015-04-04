'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _log = require('loglevel');

var _log2 = _interopRequireWildcard(_log);

var _runTests = require('../lib/tests');

'use strict';

var dependencies = ['compileBabel', 'compileBrowserify', 'compileCoffeescript', 'compileCopy',
//'compileJade',
'compileLess', 'compileLivescript', 'compileStylus'];

exports.dependencies = dependencies;
var run = _runTests.runTests;
exports.run = run;