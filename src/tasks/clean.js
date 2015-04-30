'use strict';

import log from 'loglevel';
import rimraf from 'rimraf';

const dependencies = [];

const run = function(options, cb) {
  rimraf(`${options.path}/*`, cb);
};

export default {
  dependencies,
  run
};
