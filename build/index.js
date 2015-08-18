'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _log = require('loglevel');

var _log2 = _interopRequireWildcard(_log);

var _Builder = require('./lib/Builder');

var _Builder2 = _interopRequireWildcard(_Builder);

var _defaultOptions = require('./lib/defaultOptions');

var _defaultOptions2 = _interopRequireWildcard(_defaultOptions);

var _parseOptions = require('./lib/parseOptions');

var _parseOptions2 = _interopRequireWildcard(_parseOptions);

var _tasks = require('./tasks');

var _tasks2 = _interopRequireWildcard(_tasks);

exports['default'] = function (_x, cb) {
  var inputOptions = arguments[0] === undefined ? {} : arguments[0];

  var options = global.options = _parseOptions2['default'](_defaultOptions2['default'], inputOptions);

  if (options.logging && typeof options.logging.level === 'string' && options.logging.level.length > 0) {
    _log2['default'].setLevel(options.logging.level);
  }

  var builder = new _Builder2['default'](options);

  builder.addTasks(_tasks2['default']);

  builder.start(cb);
};

module.exports = exports['default'];