'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

var _libTaskQueue = require('./lib/TaskQueue');

var _libTaskQueue2 = _interopRequireDefault(_libTaskQueue);

var _libDefaultOptions = require('./lib/defaultOptions');

var _libDefaultOptions2 = _interopRequireDefault(_libDefaultOptions);

var _libParseOptions = require('./lib/parseOptions');

var _libParseOptions2 = _interopRequireDefault(_libParseOptions);

var _tasks = require('./tasks');

var _tasks2 = _interopRequireDefault(_tasks);

exports['default'] = function (inputOptions, cb) {
  if (inputOptions === undefined) inputOptions = {};

  var options = global.options = (0, _libParseOptions2['default'])(_libDefaultOptions2['default'], inputOptions);

  if (options.logging && typeof options.logging.level === 'string' && options.logging.level.length > 0) {
    _loglevel2['default'].setLevel(options.logging.level);
  }

  var taskQueue = new _libTaskQueue2['default'](options);

  taskQueue.addTasks(_tasks2['default']);

  taskQueue.start(cb);
};

module.exports = exports['default'];