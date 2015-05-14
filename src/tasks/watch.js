'use strict';

import logging from '../lib/logging';
import { start } from '../lib/watch';

const dependencies = [ 'runTests' ];

const run = function(options, cb) {
  start(options);
  cb();
};

export default {
  dependencies,
  run
};
