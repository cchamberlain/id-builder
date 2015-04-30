'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _log = require('loglevel');

var _log2 = _interopRequireWildcard(_log);

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireWildcard(_rimraf);

'use strict';

var dependencies = [];

var run = function run(options, cb) {
  _rimraf2['default']('' + options.path + '/*', cb);
};

exports['default'] = {
  dependencies: dependencies,
  run: run
};
module.exports = exports['default'];