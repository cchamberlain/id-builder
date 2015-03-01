'use strict';

import { exists } from 'fs';

import { compileFile } from '../lib/less';
import { taskInfo } from '../lib/logging';

export const dependencies = [ 'clean' ];

export const run = function(options, cb) {
  exists(options.sourcePath, function(result) {
    if (!result) {
      taskInfo('compileLess', `skipping ${options.sourcePath} (Does not exist).`);
      return cb();
    }

    compileFile(options, options.sourcePath, options.targetPath, cb);
  });
};
