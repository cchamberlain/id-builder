'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _log = require('loglevel');

var _log2 = _interopRequireWildcard(_log);

var _start = require('../lib/watch');

'use strict';

var dependencies = ['runTests'];

exports.dependencies = dependencies;
var run = function run(options, cb) {
  _start.start(options);
  cb();
};
exports.run = run;