"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _ = _interopRequire(require("lodash"));

var auto = require("async").auto;
var moment = _interopRequire(require("moment"));

var defaultOptions = _interopRequire(require("./lib/defaultOptions"));

var _libLogging = require("./lib/logging");

var disabledTask = _libLogging.disabledTask;
var startTask = _libLogging.startTask;
var finishTask = _libLogging.finishTask;
var parseOptions = _interopRequire(require("./lib/parseOptions"));

var tasks = _interopRequire(require("./tasks"));

var logInfo = function (message) {
  console.log("" + moment().format() + " " + message);
};

var runTaskWithOptions = function (options, task, name) {
  return function (cb) {
    var taskOptions = options.tasks[name];

    if (!taskOptions) {
      return cb("No options found for task \"" + name + "\".");
    }

    if (!taskOptions.enabled) {
      disabledTask(name);
      return cb();
    }

    taskOptions.taskName = name;

    startTask(name);

    task.run(taskOptions, function (e) {
      if (e) {
        return cb(e);
      }

      finishTask(name);

      cb();
    });
  };
};

module.exports = function (inputOptions, cb) {
  inputOptions = inputOptions || {};

  global.options = parseOptions(defaultOptions, inputOptions);

  var autoTasks = _.reduce(tasks, function (m, v, k) {
    m[k] = v.dependencies.concat(runTaskWithOptions(global.options, v, k));

    return m;
  }, {});

  auto(autoTasks, cb);
};