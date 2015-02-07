"use strict";

const async = require("async");
const moment = require("moment");

const defaultOptions = require("./lib/defaultOptions");
const logging = require("./lib/logging");
const parseOptions = require("./lib/parseOptions");

const logInfo = function(message) {
  console.log(`${moment().format()} ${message}`);
};

const runTaskWithOptions = function(options, task, name) {
  return function(cb) {
    const taskOptions = options.tasks[name];

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

  const tasks = require("./tasks");
  const autoTasks = {};

  Object.keys(tasks)
    .forEach(function(k) {
      autoTasks[k] = tasks[k].dependencies.concat(runTaskWithOptions(global.options, tasks[k], k))
    });

  async.auto(autoTasks, cb);
};