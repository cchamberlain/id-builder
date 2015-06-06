'use strict';

import logging from '../lib/logging';
import webpack from '../lib/webpack';

const dependencies = [ 'runTests' ];

const run = webpack.watchAllFiles;

export default {
  dependencies,
  run
};
