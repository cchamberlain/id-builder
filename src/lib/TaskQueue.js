import _ from 'lodash';
import { auto } from 'async';

import logging from './logging';

/**
 * The taskQueue runs the tasks.
 * TODO: Find a better solution then format juggling for async.auto.
 * @class TaskQueue
 */
export default class TaskQueue {
  constructor(options = {}) {
    this.options = options;

    this.tasks = {};
    this.taskInstances = {};
    this.asyncTasks = {};

    this.compilers = {};
  }

  /**
   * Gets the options belonging to the task of `name`.
   * @param {String} name The name of the task.
   * @returns {Object} the options of the task.
   * @private
   */
  _getTaskOptions(name) {
    return this.options.tasks[name];
  }

  /**
   * Instantiates all the tasks.
   * @private
   */
  _ensureTaskInstances() {
    _.each(this.tasks, (Task, name) => {
      const options = this._getTaskOptions(name);

      if (!options) {
        throw new Error(`No options found for task "${name}".`);
      }

      if (!options.enabled) {
        // Fake a task that does nothing
        this.taskInstances[name] = {
          dependencies: []
        };
      } else {
        // Pass the taskQueue to the Task for scope.
        options.taskQueue = this;

        this.taskInstances[name] = new Task(options);
      }
    });
  }

  /**
   * Converts Task to async.auto format until I find a better solution.
   * @private
   */
  _ensureAsyncTasks() {
    _.each(this.taskInstances, (taskInstance, name) => {
      this.asyncTasks[name] = taskInstance.dependencies.concat(this._createTaskCallback(name, taskInstance));
    });
  }

  /**
   * Runs all tasks asynchronously and in parallel with dependencies first.
   * @param {Function} cb The callback function.
   * @private
   */
  _runTasks(cb) {
    // First instantiate all tasks with their options.
    this._ensureTaskInstances();

    // Then ensure the async tree looks the same.
    this._ensureAsyncTasks();

    auto(this.asyncTasks, cb);
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

      task.start(e => {
        if (e) {
          return cb(e);
        }

        logging.finishTask(name);

        cb();
      });
    };
  }

  /**
   * Adds a Task.
   * @param {Task} task The task.
   * @return TaskQueue The instance.
   */
  addTask(task) {
    this.tasks[task.name] = task;

    return this;
  }

  /**
   * Adds an Array of Task's.
   * @param {Array} tasks The tasks.
   * @return TaskQueue The instance.
   */
  addTasks(tasks) {
    _.each(tasks, this.addTask.bind(this));

    return this;
  }

  /**
   * Adds a compiler.
   * @param {Compiler} compiler The compiler.
   * @return TaskQueue The instance.
   */
  addCompiler(compiler) {
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
    const name = compiler.constructor.name;

    delete this.compilers[name];

    return this;
  }

  /**
   * Starts the taskQueue.
   * @param {Function} cb The callback function.
   */
  start(cb) {
    this._runTasks(cb);
  }
}
