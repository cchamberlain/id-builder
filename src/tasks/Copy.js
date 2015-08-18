import _ from 'lodash';
import { each } from 'async';

import CompileTask from '../lib/CompileTask';

class Copy extends CompileTask {
  constructor(options = {}) {
    super(options);

    this.dependencies = ['DirectoryCleaner'];
  }

  get otherTasks() {
    return _.filter(this.builder.taskInstances, (v, k) => {
      if (k !== this.name) {
        return v;
      }
    });
  }

  // Check all other tasks for sourceFilePathMathches functions and
  // only return true if no other matches, so don't copy files any
  // other task is interested in.
  doesntMatchOtherTaskSourceFilePath(node) {
    let result = true;

    _.each(this.otherTasks, (task) => {
      if (task.sourceFilePathMatches && task.sourceFilePathMatches(node.fullPath)) {
        result = false;
      }
    });

    return result;
  }

  getPaths(cb) {
    this.getFiles(this.sourceDirectoryPath, (e, nodes) => {
      if (e) {
        return cb(e);
      }

      const paths = _(nodes)
        .filter(this.doesntMatchOtherTaskSourceFilePath.bind(this))
        .map(v => v.fullPath)
        .value();

      cb(null, paths);
    });
  }

  // Just return the chunk to perform a copy file CompileTask#compileFile.
  // Explicitly defined to show the behaviour.
  compileChunk(chunk, cb) {
    cb(null, chunk);
  }

  run(cb) {
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
}

export default Copy;
