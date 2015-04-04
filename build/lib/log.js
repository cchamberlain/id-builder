'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireWildcard(_moment);

var _chalk = require('chalk');

var _chalk2 = _interopRequireWildcard(_chalk);

var _minilog = require('minilog');

var _minilog2 = _interopRequireWildcard(_minilog);

'use strict';

var log = _minilog2['default']('id-builder');

_minilog2['default'].pipe(_minilog2['default'].suggest).pipe(_minilog2['default'].backends.console.formatLearnboost).pipe(_minilog2['default'].backends.console);

var debug = function debug() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  log.debug.apply(log, args);
};

exports.debug = debug;
var info = function info() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  log.info.apply(log, args);
};

exports.info = info;
var warn = function warn() {
  for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  log.warn.apply(log, args);
};

exports.warn = warn;
var error = function error() {
  for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    args[_key4] = arguments[_key4];
  }

  log.error.apply(log, args);
};

exports.error = error;
var arrowCharacter = '→';
exports.arrowCharacter = arrowCharacter;
var okCharacter = '✓';
exports.okCharacter = okCharacter;
var warningCharacter = '✗';

exports.warningCharacter = warningCharacter;
var taskInfo = function taskInfo(task, message) {
  info('  ' + task + ' ' + _chalk2['default'].grey(message));
};

exports.taskInfo = taskInfo;
var taskWarn = function taskWarn(task, message) {
  warn('' + _chalk2['default'].grey(arrowCharacter) + ' ' + task + ': ' + message);
};

exports.taskWarn = taskWarn;
var taskError = function taskError(task, message) {
  error('' + _chalk2['default'].grey(arrowCharacter) + ' ' + task + ': ' + message);
};

exports.taskError = taskError;
var disabledTask = function disabledTask(name) {
  warn('' + _chalk2['default'].yellow(warningCharacter) + ' ' + name);
};

exports.disabledTask = disabledTask;
var startTask = function startTask(name) {
  info('' + _chalk2['default'].grey(arrowCharacter) + ' ' + name);
};

exports.startTask = startTask;
var finishTask = function finishTask(name) {
  info('' + _chalk2['default'].green(okCharacter) + ' ' + _chalk2['default'].green(name));
};
exports.finishTask = finishTask;