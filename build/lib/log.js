"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var moment = _interopRequire(require("moment"));

var chalk = _interopRequire(require("chalk"));

var minilog = _interopRequire(require("minilog"));

var log = minilog("id-builder");

minilog.pipe(minilog.suggest).pipe(minilog.backends.console.formatLearnboost).pipe(minilog.backends.console);

var debug = exports.debug = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  log.debug.apply(log, args);
};

var info = exports.info = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  log.info.apply(log, args);
};

var warn = exports.warn = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  log.warn.apply(log, args);
};

var error = exports.error = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  log.error.apply(log, args);
};


var arrowCharacter = exports.arrowCharacter = "→";
var okCharacter = exports.okCharacter = "✓";
var warningCharacter = exports.warningCharacter = "✗";

var taskInfo = exports.taskInfo = function (task, message) {
  info("  " + task + " " + chalk.grey(message));
};

var taskWarn = exports.taskWarn = function (task, message) {
  warn("" + chalk.grey(arrowCharacter) + " " + task + ": " + message);
};

var taskError = exports.taskError = function (task, message) {
  error("" + chalk.grey(arrowCharacter) + " " + task + ": " + message);
};

var disabledTask = exports.disabledTask = function (name) {
  warn("" + chalk.yellow(warningCharacter) + " " + name);
};

var startTask = exports.startTask = function (name) {
  info("" + chalk.grey(arrowCharacter) + " " + name);
};

var finishTask = exports.finishTask = function (name) {
  info("" + chalk.green(okCharacter) + " " + chalk.green(name));
};
Object.defineProperty(exports, "__esModule", {
  value: true
});