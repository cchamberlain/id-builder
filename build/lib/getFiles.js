'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

var _lsr = require('lsr');

var _lsr2 = _interopRequireDefault(_lsr);

var _promise = require('./promise');

var _promise2 = _interopRequireDefault(_promise);

exports['default'] = function getFiles(path) {
  var paths;
  return regeneratorRuntime.async(function getFiles$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return regeneratorRuntime.awrap(_promise2['default'].promiseFromNodeCallback(_lsr2['default'], path));

      case 2:
        paths = context$1$0.sent[0];
        return context$1$0.abrupt('return', _lodash2['default'].filter(paths, function (v) {
          return v.isFile() && v;
        }));

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

module.exports = exports['default'];

// TODO: Why is it two wrapped arrays?