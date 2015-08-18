import _ from 'lodash';

class Task {
  constructor(options = {}) {
    this.options = options;

    this.builder = options.builder;

    this.dependencies = options.dependencies || [];
  }

  addDependency(name) {
    this.dependencies.push(name);
    this.dependencies = _.uniq(this.dependencies);
  }

  addDependencies(dependencies) {
    _.each(dependencies, (dependency) => {
      this.addDependency(dependency);
    });
  }

  removeDependency(name) {
    this.dependencies = _.without(this.dependencies, name);
  }

  start(cb) {
    if (!this.run) {
      throw new Error('No run function set.');
    }

    // TODO: This is horrible!
    this.__proto__.run.call(this, cb);
  }
}

export default Task;
