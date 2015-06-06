'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _logging = require('../lib/logging');

var _logging2 = _interopRequireWildcard(_logging);

var _browserify = require('../lib/browserify');

var _browserify2 = _interopRequireWildcard(_browserify);

'use strict';

var dependencies = ['compileBabel', 'compileCoffeescript', 'compileCopy', 'compileLess', 'compileLivescript', 'compileStylus'];

var run = _browserify2['default'].compileAllFiles;

exports['default'] = {
  dependencies: dependencies,
  run: run
};
module.exports = exports['default'];