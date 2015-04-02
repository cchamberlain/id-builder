'use strict';

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _log = require('loglevel');

var log = _interopRequire(_log);

var _compileAllFiles = require('../lib/livescript');

'use strict';

var dependencies = ['clean'];

exports.dependencies = dependencies;
var run = _compileAllFiles.compileAllFiles;
exports.run = run;