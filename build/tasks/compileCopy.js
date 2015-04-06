'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _log = require('loglevel');

var _log2 = _interopRequireWildcard(_log);

var _copyAllFiles = require('../lib/copy');

'use strict';

var dependencies = ['clean'];

var run = _copyAllFiles.copyAllFiles;

exports['default'] = {
  dependencies: dependencies,
  run: run
};
module.exports = exports['default'];