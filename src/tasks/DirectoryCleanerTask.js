// - Give tasks a name so you can create one like 'Clean#1234' so you can
//   actually launch a dependency on that one and not have dependencies only
//   work for the class name. Like this we can have many of the same kind of
//   tasks active at the same time.
// - Because tasks have a name, they can get to their own configuration within
//   that of the task queue. Putting a Configuration on each task doesn't work
//   as it breaks .get() lookups with variables.
// - save each task class as a string in the configuration of the task.
//

import _ from 'lodash';
import rimraf from 'rimraf';
import async from 'async';
import log from 'loglevel';

import promise from '../lib/promise';
import Task from '../lib/Task';

class DirectoryCleanerTask extends Task {
  constructor(taskQueue) {
    super(taskQueue);

    this.paths = this.configuration.paths;
  }

  /**
   * Removes the contents of a directory.
   * @param {String} directoryPath The path of the directory to empty.
   */
  async removeDirectoryContents(directoryPath) {
    await promise.promiseFromNodeCallback(rimraf, `${directoryPath}/**/*`);
  }

  /**
   * Runs the task.
   */
  async run() {
    await Promise.all(_.map(this.paths, path => this.removeDirectoryContents(path)));
  }
}

export default DirectoryCleanerTask;
