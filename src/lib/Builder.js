import _ from 'lodash';
import { auto } from 'async';

import logging from './logging';

class Builder {
  constructor(options = {}) {
    this.options = options;

    this.tasks = {};
    this.taskInstances = {};
    this.asyncTasks = {};
  }

  // Gets the options belonging to the task of `name`.
  _getTaskOptions(name) {
    return this.options.tasks[name];
  }

  // Instantiates all the tasks.
  // TODO: Find a better way to do this.
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
        // Pass the builder to the Task for scope.
        options.builder = this;

        this.taskInstances[name] = new Task(options);
      }
    });
  }

  // Converts Task to async.auto format until I find a better solution.
  _ensureAsyncTasks() {
    _.each(this.taskInstances, (taskInstance, name) => {
      this.asyncTasks[name] = taskInstance.dependencies.concat(this._createTaskCallback(name, taskInstance));
    });
  }

  _runTasks(cb) {
    // First instantiate all tasks with their options.
    this._ensureTaskInstances();

    // Then ensure the async tree looks the same.
    this._ensureAsyncTasks();

    auto(this.asyncTasks, cb);
  }

  _createTaskCallback(name, task) {
    // Make sure all callbacks get fired for dependencies wether they run or not.
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

  // TODO: Actually convert all the tasks to Task classes.
  addTask(task) {
    this.tasks[task.name] = task;
  }

  addTasks(tasks) {
    _.each(tasks, this.addTask.bind(this));
  }

  start(cb) {
    this._runTasks(cb);
  }
}

export default Builder;
