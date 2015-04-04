import _ from 'lodash';
import EventEmitter from 'events';

export default class Task extends EventEmitter {
  constructor(name = '', dependencies = [], fn) {
    super();

    this.setName(name);
    this.setDependencies(dependencies);
    this.setFn(fn);
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;

    this.emit('name', name);

    return this;
  }

  getDependencies() {
    return this.dependencies;
  }

  setDependencies(dependencies) {
    this.dependencies = dependencies

    this.emit('dependencies', dependencies);

    return this;
  }

  getFn() {
    return this.fn;
  }

  setFn(fn) {
    this.fn = fn;

    this.emit('fn', fn);

    return this;
  }

  run(cb) {
    cb(this.fn);
  }
}

let babelCompileTask = new Task('compile-babel', undefined, function(cb) {
  doStuff(cb);
});

babelCompileTask
  .setName('something-else')
  .setDependencies([
    'clean'
  ])
  .setFn(function(cb) {
    console.log('custom!');
    cb();
  })
  .run(function(error) {
  });
