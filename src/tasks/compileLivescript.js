'use strict';

import log from 'loglevel';
import { compileAllFiles } from '../lib/livescript';

const dependencies = [ 'clean' ];

const run = compileAllFiles;

export default {
  dependencies,
  run
};
