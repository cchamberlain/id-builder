'use strict';

import minilog from 'minilog';
import _ from 'lodash';
import { auto } from 'async';
import moment from 'moment';

import log from './lib/log';
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
      //log.disabledTask(name);
      return cb();
    }

    taskOptions.taskName = name;

    log.startTask(name);

    task.run(taskOptions, function(e) {
      if (e) {
        return cb(e);
      }

      log.finishTask(name);

      cb();
    });
  };
};

export default function(inputOptions = {}, cb) {
  const options = global.options = parseOptions(defaultOptions, inputOptions);

  if (options.logging) {
    minilog.suggest.deny(/.*/, options.logging.level)
  }

  const autoTasks = _.reduce(tasks, function(m, v, k) {
    m[k] = v.dependencies.concat(runTaskWithOptions(options, v, k));

    return m;
  }, {});

  auto(autoTasks, cb);
};
