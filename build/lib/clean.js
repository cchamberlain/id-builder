'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _readdir = require('fs');

var _import = require('lodash');

var _import2 = _interopRequireWildcard(_import);

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireWildcard(_rimraf);

var _each = require('async');

var _import3 = require('./log');

var log = _interopRequireWildcard(_import3);

'use strict';

var directory = function directory(options, cb) {
  log.debug('clean.directory', options.path);

  _readdir.readdir(options.path, function (e, nodes) {
    if (e) {
      return cb(e);
    }

    var paths = _import2['default'](nodes).map(function (v) {
      var path = '' + options.path + '/' + v;

      log.taskInfo(options.taskName, path);

      return path;
    }).value();

    _each.each(paths, _rimraf2['default'], cb);
  });
};
exports.directory = directory;