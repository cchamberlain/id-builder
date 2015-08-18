import log from 'loglevel';
import rimraf from 'rimraf';
import { each } from 'async';

import Task from '../lib/Task';

class DirectoryCleaner extends Task {
  constructor(options = {}) {
    super(options);

    this.paths = options.paths;
  }

  removeDirectoryContents(path, cb) {
    rimraf(`${path}/**/*`, cb);
  }

  run(cb) {
    each(this.paths, this.removeDirectoryContents.bind(this), cb);
  }
}

export default DirectoryCleaner;
