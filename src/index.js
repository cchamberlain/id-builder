import log from 'loglevel';

import TaskQueue from './lib/TaskQueue';
import defaultOptions from './lib/defaultOptions';
import parseOptions from './lib/parseOptions';

import tasks from './tasks';

export default function(inputOptions = {}, cb) {
  const options = global.options = parseOptions(defaultOptions, inputOptions);

  if (options.logging && typeof options.logging.level === 'string' && options.logging.level.length > 0) {
    log.setLevel(options.logging.level);
  }

  const taskQueue = new TaskQueue(options);

  taskQueue.addTasks(tasks);

  taskQueue.start(cb);
}
