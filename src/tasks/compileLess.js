'use strict';

import { exists } from 'fs';

import { compileFile } from '../lib/less';
import logging from '../lib/logging';

const dependencies = [ 'clean' ];

const run = function(options, cb) {
  exists(options.sourceFilePath, result => {
    if (!result) {
      logging.taskInfo('compileLess', `skipping ${options.sourceFilePath} (Does not exist).`);
      return cb();
    }

    compileFile(options, options.sourceFilePath, options.targetFilePath, cb);
  });
};

export default {
  dependencies,
  run
};
