'use strict';

import _ from 'lodash';
import { auto } from 'async';
import moment from 'moment';

import defaultOptions from './lib/defaultOptions';
import { disabledTask, startTask, finishTask } from './lib/logging';
import parseOptions from './lib/parseOptions';
import * as tasks from './tasks';

const logInfo = function(message) {
  console.log(`${moment().format()} ${message}`);
};

const runTaskWithOptions = function(options, task, name) {
  return function(cb) {
    const taskOptions = options.tasks[name];

    if (!taskOptions) {
      return cb(`No options found for task ${name}.`);
    }

    if (!taskOptions.enabled) {
      disabledTask(name);
      return cb();
    }

    taskOptions.taskName = name;

    startTask(name);

    task.run(taskOptions, function(e) {
      if (e) {
        return cb(e);
      }

      finishTask(name);

      cb();
    });
  };
};

export default function(inputOptions, cb) {
  inputOptions = inputOptions || {};

  global.options = parseOptions(defaultOptions, inputOptions);

  const autoTasks = _.reduce(tasks, function(m, v, k) {
    console.log(k, v);

    m[k] = v.dependencies.concat(runTaskWithOptions(global.options, v, k));

    return m;
  }, {});

  auto(autoTasks, cb);
};
