import logging from '../lib/logging';
import stylus from '../lib/stylus';

const dependencies = [ 'clean' ];

const run = stylus.compileAllFiles;

export default {
  dependencies,
  run
};
