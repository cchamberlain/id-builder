'use strict';

import logging from '../lib/logging';
import { watch } from '../lib/browserify';

const dependencies = [ 'runTests' ];

const run = watch;

export default {
  dependencies,
  run
};
