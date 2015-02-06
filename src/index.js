'use strict';

let async = require("async");
let moment = require("moment");

let defaultOptions = require("./lib/default-options");
let logging = require("./lib/logging");
let parseOptions = require("./lib/parse-options");

let logInfo = function(message) {
  console.log(`${moment().format()} ${message}`);
};

let runTaskWithOptions = function(options, task, name) {
  return function(cb) {
    let taskOptions = options.tasks[name];

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

  let tasks = require("./tasks");
  let autoTasks = {};

  for (let k in tasks) {
    autoTasks[k] = tasks[k].dependencies.concat(runTaskWithOptions(global.options, tasks[k], k));
  }

  async.auto(autoTasks, cb);
};

/*
module.exports = (input-options = {}, cb) ->
  # First set globals.
  global.options = parse-options default-options, input-options

  # Then require.
  tasks = require "./tasks"

  auto-tasks = {}
  for let k, v of tasks
    auto-tasks[k] = v.dependencies ++ run-task-with-options global.options, v, k

  error, results <-! async.auto auto-tasks
  return cb error if error
*/