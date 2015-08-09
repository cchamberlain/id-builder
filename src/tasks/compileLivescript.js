import logging from '../lib/logging';
import livescript from '../lib/livescript';

const dependencies = [ 'clean' ];

const run = livescript.compileAllFiles;

export default {
  dependencies,
  run
};
