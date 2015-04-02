'use strict';

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _log = require('loglevel');

var log = _interopRequire(_log);

var _copyAllFiles = require('../lib/copy');

'use strict';

var dependencies = ['clean'];

exports.dependencies = dependencies;
var run = _copyAllFiles.copyAllFiles;
exports.run = run;