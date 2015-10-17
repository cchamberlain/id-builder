import _ from 'lodash';

import log from 'loglevel';
import { each } from 'async';

import CompileTask from '../lib/CompileTask';
import getFiles from '../lib/getFiles';

import CopyCompiler from '../compilers/CopyCompiler';

function getNames(tasks) {
  return _(tasks)
    .pluck('constructor')
    .pluck('name')
    .value();
}

class CopyCompileTask extends CompileTask {
  constructor(options = {}) {
    super(options);

    this.setCompiler(CopyCompiler);

    _.bindAll(this, [
      'isCompileTask',
      'isntThisTask'
    ]);
  }

  isCompileTask(task) {
    return task instanceof CompileTask;
  }

  isntThisTask(task) {
    return task.constructor.name !== this.constructor.name;
  }

  get otherCompileTasks() {
    return _(this.builder.taskInstances)
      .filter(this.isCompileTask)
      .filter(this.isntThisTask)
      .value();
  }

  get sourceFilePathMatchExpression() {
    return new RegExp(`^${this.sourceDirectoryPath}.+$`);
  }

  sourceFilePathMatches(sourceFilePath) {
    return super.sourceFilePathMatches(sourceFilePath) && this.doesntMatchOtherTaskSourceFilePath(sourceFilePath);
  }

  // Check all other tasks for sourceFilePathMathches functions and
  // only return true if no other matches, so don't copy files any
  // other task is interested in.
  doesntMatchOtherTaskSourceFilePath(path) {
    let result = true;

    _.each(this.otherCompileTasks, (task) => {
      if (task.sourceFilePathMatches && task.sourceFilePathMatches(path)) {
        result = false;
      }
    });

    return result;
  }

  getPaths(cb) {
    getFiles(this.sourceDirectoryPath, (e, nodes) => {
      if (e) {
        return cb(e);
      }


      const paths = _(nodes)
        .map(v => v.fullPath)
        .filter(this.doesntMatchOtherTaskSourceFilePath.bind(this))
        .value();

      cb(null, paths);
    });
  }

  compileAllFiles(cb) {
    this.getPaths((e, paths) => {
      if (e) {
        return cb(e);
      }

      const iteratePath = (currentSourceDirectoryPath, cb) => {
        const currentTargetDirectoryPath = currentSourceDirectoryPath.replace(this.sourceDirectoryPath, this.targetDirectoryPath);

        this.compileFile(currentSourceDirectoryPath, currentTargetDirectoryPath, cb);
      };

      each(paths, iteratePath, cb);
    });
  }

  run(cb) {
    this.compileAllFiles(cb);
  }
}

export default CopyCompileTask;
