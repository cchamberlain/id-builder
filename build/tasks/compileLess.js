'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _exists = require('fs');

var _compileFile = require('../lib/less');

var _log = require('../lib/log');

var _log2 = _interopRequireWildcard(_log);

'use strict';

var dependencies = ['clean'];

var run = function run(options, cb) {
  _exists.exists(options.sourceFilePath, function (result) {
    if (!result) {
      _log2['default'].taskInfo('compileLess', 'skipping ' + options.sourceFilePath + ' (Does not exist).');
      return cb();
    }

    _compileFile.compileFile(options, options.sourceFilePath, options.targetFilePath, cb);
  });
};

exports['default'] = {
  dependencies: dependencies,
  run: run
};
module.exports = exports['default'];