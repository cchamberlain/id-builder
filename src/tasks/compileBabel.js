'use strict';

import logging from '../lib/logging';
import babel from '../lib/babel';

const dependencies = [ 'clean' ];

const run = babel.compileAllFiles;

export default {
  dependencies,
  run
};
