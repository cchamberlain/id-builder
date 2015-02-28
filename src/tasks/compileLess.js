'use strict';

import { compileFile } from '../lib/less';

export const dependencies = [ 'clean' ];

export const run = function(options, cb) {
  compileFile(options, options.sourcePath, options.targetPath, cb);
};
