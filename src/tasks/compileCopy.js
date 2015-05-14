'use strict';

import logging from '../lib/logging';
import { copyAllFiles } from '../lib/copy';

const dependencies = [ 'clean' ];

const run = copyAllFiles;

export default {
  dependencies,
  run
};
