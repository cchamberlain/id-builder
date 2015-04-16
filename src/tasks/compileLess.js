'use strict';

import { exists } from 'fs';

import { compileFile } from '../lib/less';
import log from '../lib/log';

const dependencies = [ 'clean' ];

const run = (options, cb) => {
  exists(options.sourcePath, (result) => {
    if (!result) {
      log.taskInfo('compileLess', `skipping ${options.sourcePath} (Does not exist).`);
      return cb();
    }

    compileFile(options, options.sourcePath, options.targetPath, cb);
  });
};

export default {
  dependencies,
  run
};
