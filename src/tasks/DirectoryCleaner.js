import { each } from 'async';
import rimraf from 'rimraf';

import Task from '../lib/Task';

class DirectoryCleaner extends Task {
  run(options, cb) {
    each(options.paths, (path, cb) => {
      rimraf(`${path}/**/*`, cb);
    }, cb);
  }
}

export default DirectoryCleaner;
