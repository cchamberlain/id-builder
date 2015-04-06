'use strict';

import log from 'loglevel';
import { copyAllFiles } from '../lib/copy';

const dependencies = [ 'clean' ];

const run = copyAllFiles;

export default {
  dependencies,
  run
};
