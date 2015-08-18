'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _watch = require('../lib/watch');

var _watch2 = _interopRequireWildcard(_watch);

var dependencies = ['runTests'];

function run(options, cb) {
  _watch2['default'].start(options);
  cb();
}

exports['default'] = {
  dependencies: dependencies,
  run: run
};
module.exports = exports['default'];