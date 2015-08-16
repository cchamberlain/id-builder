import { each } from 'async';
import rimraf from 'rimraf';

import Task from '../lib/Task';

class DirectoryCleanerTask extends Task {
  constructor(options = {}) {
    super(options);
  }

  run(options, cb) {
    each(options.paths, (path, cb) => {
      rimraf(path, cb);
    }, cb);
  }
}

export default DirectoryCleanerTask;
