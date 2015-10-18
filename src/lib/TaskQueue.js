import _ from 'lodash';
import async from 'async';
import log from 'loglevel';

import Configuration from './Configuration';
import logging from './logging';

/**
 * The taskQueue runs the tasks.
 * TODO: Find a better solution then format juggling for async.auto.
 * @class TaskQueue
 */
export default class TaskQueue {
  constructor(configuration) {
    // log.debug(`TaskQueue#constructor`);

    this.configuration = configuration;

    // TODO: Document.
    this.taskClasses = {};

    // TODO: Document.
    this.taskInstances = {};

    // TODO: Document.
    this.asyncTasks = {};

    // TODO: Document.
    this.compilers = {};
  }

  /**
   * Instantiates all the tasks.
   * @private
   */
  _ensureTaskInstances() {
    // log.debug(`TaskQueue#_ensureTaskInstances`);

    _.each(this.taskClasses, (Task, name) => {
      // TODO: Refactor: Move this into `Task`.
      const taskOptions = this.configuration.get(`tasks.${name}`);

      if (!taskOptions) {
        throw new Error(`No options found for task "${name}".`);
      }

      if (!taskOptions.enabled) {
        // Fake a task that does nothing
        this.taskInstances[name] = {
          dependencies: []
        };
      } else {
        this.taskInstances[name] = new Task({
          taskQueue: this
        });
      }
    });
  }

  /**
   * Converts Task to async.auto format until I find a better solution.
   * @private
   */
  _ensureAsyncTasks() {
    // log.debug(`TaskQueue#_ensureAsyncTasks`);

    _.each(this.taskInstances, (taskInstance, name) => {
      this.asyncTasks[name] = taskInstance.dependencies.concat(this._createTaskCallback(name, taskInstance));
    });
  }

  /**
   * Runs all tasks asynchronously and in parallel with dependencies first.
   * @private
   */
  async _runTasks() {
    // log.debug(`TaskQueue#_runTasks`);

    // First instantiate all tasks with their options.
    this._ensureTaskInstances();

    // Then ensure the async tree looks the same.
    this._ensureAsyncTasks();

    return new Promise((resolve, reject) => {
      async.auto(this.asyncTasks, (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      })
    });
  }

  /**
   * Creates a callback for a task to be ran.
   * TODO: Better describe what this does.
   * @param {String} name The name of the task.
   * @param {Task} task The Task.
   * @returns {Function} The callback function.
   * @private
   */
  _createTaskCallback(name, task) {
    // Make sure all callbacks get fired for dependencies, whether they run or
    // not.
    // TODO: Explain better what this does. This description is not enough.
    if (!task.start) {
      return (cb) => {
        logging.skipTask(name);
        cb();
      };
    }

    return (cb) => {
      logging.startTask(name);

      task.start()
        .then(() => {
          logging.finishTask(name);

          cb();
        })
        .catch(error => {
          cb(error);
        });
    };
  }

  /**
   * Adds a Task.
   * @param {Task} taskClass The task class.
   * @return TaskQueue The instance.
   */
  addTaskClass(taskClass) {
    // log.debug(`TaskQueue#addTaskClass ${taskClass.name}`);

    this.taskClasses[taskClass.name] = taskClass;

    return this;
  }

  /**
   * Adds an Array of Task classes.
   * @param {Array} tasks The task classes.
   * @return TaskQueue The instance.
   */
  addTaskClasses(tasks) {
    // log.debug(`TaskQueue#addTaskClasses`);

    _.each(tasks, this.addTaskClass.bind(this));

    return this;
  }

  /**
   * Adds a `Compiler`.
   * @param {Compiler} compiler The compiler.
   * @return TaskQueue The instance.
   */
  addCompiler(compiler) {
    // log.debug(`TaskQueue#addCompiler`);

    const name = compiler.constructor.name;

    this.compilers[name] = compiler;

    return this;
  }

  /**
   * Removes a compiler.
   * @param {Compiler} compiler The compiler.
   * @return TaskQueue The instance.
   */
  removeCompiler(compiler) {
    // log.debug(`TaskQueue#removeCompiler`);

    const name = compiler.constructor.name;

    delete this.compilers[name];

    return this;
  }

  /**
   * Starts the taskQueue.
   */
  async start() {
    // log.debug(`TaskQueue#start`);

    await this._runTasks();
  }
}
