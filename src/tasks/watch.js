'use strict';

import logging from '../lib/logging';
import watch from '../lib/watch';

const dependencies = [ 'runTests' ];

const run = function(options, cb) {
  watch.start(options);
  cb();
};

export default {
  dependencies,
  run
};
