'use strict';

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _log = require('loglevel');

var log = _interopRequire(_log);

var _watch = require('../lib/browserify');

'use strict';

var dependencies = ['runTests'];

exports.dependencies = dependencies;
var run = _watch.watch;
exports.run = run;