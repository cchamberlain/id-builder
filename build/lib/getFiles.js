'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _lsr = require('lsr');

var _lsr2 = _interopRequireDefault(_lsr);

function getFiles(path, cb) {
  (0, _lsr2['default'])(path, function (e, nodes) {
    if (e) {
      return cb(e);
    }

    cb(null, (0, _lodash2['default'])(nodes).filter(function (v) {
      return v.isFile() && v;
    }).value());
  });
}

exports['default'] = getFiles;
module.exports = exports['default'];