'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libWatch = require('../lib/watch');

var _libWatch2 = _interopRequireDefault(_libWatch);

var dependencies = ['runTests'];

function run(options, cb) {
  _libWatch2['default'].start(options);
  cb();
}

exports['default'] = {
  dependencies: dependencies,
  run: run
};
module.exports = exports['default'];