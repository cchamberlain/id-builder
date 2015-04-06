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

var _log = require('./log');

var _log2 = _interopRequireWildcard(_log);

'use strict';

var directory = function directory(options, cb) {
  _log2['default'].debug('clean.directory', options.path);

  _readdir.readdir(options.path, function (e, nodes) {
    if (e) {
      return cb(e);
    }

    var paths = _import2['default'](nodes).map(function (v) {
      var path = '' + options.path + '/' + v;

      _log2['default'].taskInfo(options.taskName, path);

      return path;
    }).value();

    _each.each(paths, _rimraf2['default'], cb);
  });
};

exports['default'] = {
  directory: directory
};
module.exports = exports['default'];