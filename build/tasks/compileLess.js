'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _exists = require('fs');

var _compileFile = require('../lib/less');

var _import = require('../lib/log');

var log = _interopRequireWildcard(_import);

'use strict';

var dependencies = ['clean'];

exports.dependencies = dependencies;
var run = function run(options, cb) {
  _exists.exists(options.sourcePath, function (result) {
    if (!result) {
      log.taskInfo('compileLess', 'skipping ' + options.sourcePath + ' (Does not exist).');
      return cb();
    }

    _compileFile.compileFile(options, options.sourcePath, options.targetPath, cb);
  });
};
exports.run = run;