import logging from '../lib/logging';
import copy from '../lib/copy';

const dependencies = [ 'clean' ];

const run = copy.copyAllFiles;

export default {
  dependencies,
  run
};
