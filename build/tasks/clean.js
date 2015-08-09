'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _log = require('loglevel');

var _log2 = _interopRequireWildcard(_log);

var _async = require('async');

var _async2 = _interopRequireWildcard(_async);

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireWildcard(_rimraf);

var _logging = require('../lib/logging');

var _logging2 = _interopRequireWildcard(_logging);

var dependencies = [];

var run = function run(options, cb) {
  _async2['default'].each(options.paths, function (path, cb) {
    _rimraf2['default'](path, cb);
  }, cb);
};

exports['default'] = {
  dependencies: dependencies,
  run: run
};
module.exports = exports['default'];