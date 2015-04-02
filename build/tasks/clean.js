'use strict';

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _log = require('loglevel');

var log = _interopRequire(_log);

var _directory = require('../lib/clean');

'use strict';

var dependencies = [];

exports.dependencies = dependencies;
var run = function run(options, cb) {
  _directory.directory(options, cb);
};
exports.run = run;