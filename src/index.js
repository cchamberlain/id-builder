"use strict";

const _ = require("lodash");
const async = require("async");
const moment = require("moment");

const defaultOptions = require("./lib/defaultOptions");
const logging = require("./lib/logging");
const parseOptions = require("./lib/parseOptions");
const tasks = require("./tasks");

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

  const autoTasks = _.reduce(tasks, function(m, v, k) {
    m[k] = v.dependencies.concat(runTaskWithOptions(global.options, v, k));

    return m;
  }, {});

  async.auto(autoTasks, cb);
};