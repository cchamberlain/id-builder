'use strict';

import logging from '../lib/logging';
import { compileAllFiles } from '../lib/coffeescript';

const dependencies = [ 'clean' ];

const run = compileAllFiles;

export default {
  dependencies,
  run
};
