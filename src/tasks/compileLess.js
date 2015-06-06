'use strict';

import fs from 'fs';

import less from '../lib/less';
import logging from '../lib/logging';

const dependencies = [ 'clean' ];

const run = function(options, cb) {
  fs.exists(options.sourceFilePath, result => {
    if (!result) {
      logging.taskInfo('compileLess', `skipping ${options.sourceFilePath} (Does not exist).`);
      return cb();
    }

    less.compileFile(options, options.sourceFilePath, options.targetFilePath, cb);
  });
};

export default {
  dependencies,
  run
};
