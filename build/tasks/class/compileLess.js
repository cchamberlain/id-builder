'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireWildcard(_fs);

var _less = require('../lib/less');

var _less2 = _interopRequireWildcard(_less);

var _logging = require('../lib/logging');

var _logging2 = _interopRequireWildcard(_logging);

var dependencies = ['clean'];

function run(options, cb) {
  _fs2['default'].exists(options.sourceFilePath, function (result) {
    if (!result) {
      _logging2['default'].taskInfo('compileLess', 'skipping ' + options.sourceFilePath + ' (Does not exist).');
      return cb();
    }

    _less2['default'].compileFile(options, options.sourceFilePath, options.targetFilePath, cb);
  });
}

exports['default'] = {
  dependencies: dependencies,
  run: run
};
module.exports = exports['default'];