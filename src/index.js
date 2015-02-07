"use strict";

var async = require("async");
var moment = require("moment");

var defaultOptions = require("./lib/defaultOptions");
var logging = require("./lib/logging");
var parseOptions = require("./lib/parseOptions");

var logInfo = function(message) {
  console.log(`${moment().format()} ${message}`);
};

var runTaskWithOptions = function(options, task, name) {
  return function(cb) {
    var taskOptions = options.tasks[name];

    if (!taskOptions) {
      return cb `No options found for task ${name}.`
    }

    if (!taskOptions.enabled) {
      logging.disabledTask(name);
      return cb();
    }

    taskOptions.taskName = name;

    logging.startTask(name);

    task.run(taskOptions, function(e) {
      if (e) {
        return cb(e);
      }

      logging.finishTask(name);

      cb();
    });
  };
};

module.exports = function(inputOptions, cb) {
  inputOptions = inputOptions || {};

  global.options = parseOptions(defaultOptions, inputOptions);

  var tasks = require("./tasks");
  var autoTasks = {};

  for (let k in tasks) {
    autoTasks[k] = tasks[k].dependencies.concat(runTaskWithOptions(global.options, tasks[k], k));
  }

  async.auto(autoTasks, cb);
};