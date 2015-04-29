'use strict';

import log from 'loglevel';
import clean from '../lib/clean';

const dependencies = []

const run = function (options, cb) {
  clean.directory(options, cb);
};

export default {
  dependencies,
  run
};
