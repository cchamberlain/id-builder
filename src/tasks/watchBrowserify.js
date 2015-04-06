'use strict';

import log from 'loglevel';
import { watch } from '../lib/browserify';

const dependencies = [ 'runTests' ];

const run = watch;

export default {
  dependencies,
  run
};
