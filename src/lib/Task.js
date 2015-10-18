import _ from 'lodash';

/**
 * Represents one thing to be done. May be a long running task.
 * TODO: add a removeDependencies(array) method.
 * @class Task
 */
export default class Task {
  constructor(options = {}) {
    this.options = options;

    this.taskQueue = options.taskQueue;

    this.dependencies = options.dependencies || [];
  }

  /**
   * Adds a dependency.
   * @param {String} name The name of the dependency.
   * @return Task The instance.
   */
  addDependency(name) {
    this.dependencies.push(name);
    this.dependencies = _.uniq(this.dependencies);

    return this;
  }

  /**
   * Removes a dependency.
   * @param {String} name The name of the dependency.
   * @return Task The instance.
   */
  removeDependency(name) {
    this.dependencies = _.without(this.dependencies, name);

    return this;
  }

  /**
   * Adds an Array of strings as dependencies.
   * @param {Array} dependencies An array of strings.
   * @return Task The instance.
   */
  addDependencies(dependencies) {
    _.each(dependencies, (dependency) => {
      this.addDependency(dependency);
    });

    return this;
  }

  /**
   * Starts the task.
   * @param {Function} cb The callback function.
   */
  start(cb) {
    if (!this.run) {
      throw new Error('No run function set.');
    }

    // TODO: This is horrible!
    this.__proto__.run.call(this, cb);
  }
}
