import events from 'events';

import _ from 'lodash';
import log from 'loglevel';

import Configuration from './Configuration';

/**
 * Represents one thing to be done. May be a long running task.
 * TODO: add a removeDependencies(array) method.
 * @class Task
 */
export default class Task extends events.EventEmitter {
  constructor(options = {}) {
    // log.debug('Task#constructor');

    super(options);

    this.taskQueue = options.taskQueue;

    this.configuration = this.taskQueue.configuration.get(`tasks.${this.constructor.name}`);

    this.dependencies = this.configuration.dependencies;
  }

  /**
   * Starts the task.
   */
  async start() {
    // log.debug('Task#start');

    if (!this.run) {
      throw new Error('No run function set.');
    }

    // TODO: This is horrible!
    await this.__proto__.run.call(this);
  }

  /**
   * Runs the task. Abstract method, implemented as No-Op for this
   * class.
   */
  async run() {
    // log.debug('Task#run');
  }
}
