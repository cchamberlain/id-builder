'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _log = require('loglevel');

var _log2 = _interopRequireWildcard(_log);

var _compileAllFiles = require('../lib/babel');

'use strict';

var dependencies = ['clean'];

exports.dependencies = dependencies;
var run = _compileAllFiles.compileAllFiles;
exports.run = run;