'use strict';

import logging from '../lib/logging';
import { compileAllFiles } from '../lib/livescript';

const dependencies = [ 'clean' ];

const run = compileAllFiles;

export default {
  dependencies,
  run
};
