'use strict';

import log from 'loglevel';
import { directory } from '../lib/clean';

const dependencies = []

const run = function (options, cb) {
  directory(options, cb);
};

export default {
  dependencies,
  run
};
