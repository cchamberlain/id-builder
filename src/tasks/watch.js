'use strict';

import log from 'loglevel';
import { start } from '../lib/watch';

const dependencies = [ 'runTests' ];

const run = (options, cb) => {
  start(options);
  cb();
};

export default {
  dependencies,
  run
};
