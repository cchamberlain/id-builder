'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _log = require('loglevel');

var _log2 = _interopRequireWildcard(_log);

var _compileAllFiles = require('../lib/stylus');

'use strict';

var dependencies = ['clean'];

var run = _compileAllFiles.compileAllFiles;

exports['default'] = {
  dependencies: dependencies,
  run: run
};
module.exports = exports['default'];