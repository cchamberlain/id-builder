'use strict';

import _ from 'lodash';
import log from 'loglevel';
import moment from 'moment';
import { auto } from 'async';

import logging from './lib/logging';
import defaultOptions from './lib/defaultOptions';
import parseOptions from './lib/parseOptions';
import tasks from './tasks';

const runTaskWithOptions = function(options, task, name) {
  return function(cb) {
    const taskOptions = options.tasks[name];

    if (!taskOptions) {
      return cb(`No options found for task "${name}".`);
    }

    if (!taskOptions.enabled) {
      //logging.disabledTask(name);
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

export default function(inputOptions = {}, cb) {
  const options = global.options = parseOptions(defaultOptions, inputOptions);

  if (options.logging && typeof options.logging.level === 'string' && options.logging.level.length > 0) {
    log.setLevel(options.logging.level);
  }

  const autoTasks = _.reduce(tasks, function(m, v, k) {
    m[k] = v.dependencies.concat(runTaskWithOptions(options, v, k));

    return m;
  }, {});

  auto(autoTasks, cb);
};
