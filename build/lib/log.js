'use strict';

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _moment = require('moment');

var moment = _interopRequire(_moment);

var _chalk = require('chalk');

var chalk = _interopRequire(_chalk);

var _minilog = require('minilog');

var minilog = _interopRequire(_minilog);

'use strict';

var log = minilog('id-builder');

minilog.pipe(minilog.suggest).pipe(minilog.backends.console.formatLearnboost).pipe(minilog.backends.console);

var debug = function debug() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  log.debug.apply(log, args);
};

exports.debug = debug;
var info = function info() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  log.info.apply(log, args);
};

exports.info = info;
var warn = function warn() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  log.warn.apply(log, args);
};

exports.warn = warn;
var error = function error() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
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
  info('  ' + task + ' ' + chalk.grey(message));
};

exports.taskInfo = taskInfo;
var taskWarn = function taskWarn(task, message) {
  warn('' + chalk.grey(arrowCharacter) + ' ' + task + ': ' + message);
};

exports.taskWarn = taskWarn;
var taskError = function taskError(task, message) {
  error('' + chalk.grey(arrowCharacter) + ' ' + task + ': ' + message);
};

exports.taskError = taskError;
var disabledTask = function disabledTask(name) {
  warn('' + chalk.yellow(warningCharacter) + ' ' + name);
};

exports.disabledTask = disabledTask;
var startTask = function startTask(name) {
  info('' + chalk.grey(arrowCharacter) + ' ' + name);
};

exports.startTask = startTask;
var finishTask = function finishTask(name) {
  info('' + chalk.green(okCharacter) + ' ' + chalk.green(name));
};
exports.finishTask = finishTask;