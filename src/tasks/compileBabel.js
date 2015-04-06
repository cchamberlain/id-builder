'use strict';

import log from 'loglevel';
import { compileAllFiles } from '../lib/babel';

const dependencies = [ 'clean' ];

const run = compileAllFiles;

export default {
  dependencies,
  run
};
