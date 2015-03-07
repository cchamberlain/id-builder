'use strict';

import { exists } from 'fs';

import { compileFile } from '../lib/less';
import * as log from '../lib/log';

export const dependencies = [ 'clean' ];

export const run = function(options, cb) {
  exists(options.sourcePath, function(result) {
    if (!result) {
      log.taskInfo('compileLess', `skipping ${options.sourcePath} (Does not exist).`);
      return cb();
    }

    compileFile(options, options.sourcePath, options.targetPath, cb);
  });
};
