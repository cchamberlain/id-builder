'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _readdir = require('fs');

var _import = require('lodash');

var _ = _interopRequire(_import);

var _rimraf = require('rimraf');

var rimraf = _interopRequire(_rimraf);

var _each = require('async');

var _import2 = require('./log');

var log = _interopRequireWildcard(_import2);

'use strict';

var directory = function directory(options, cb) {
  log.debug('clean.directory', options.path);

  _readdir.readdir(options.path, function (e, nodes) {
    if (e) {
      return cb(e);
    }

    var paths = _(nodes).map(function (v) {
      var path = '' + options.path + '/' + v;

      log.taskInfo(options.taskName, path);

      return path;
    }).value();

    _each.each(paths, rimraf, cb);
  });
};
exports.directory = directory;