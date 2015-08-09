import logging from '../lib/logging';
import browserify from '../lib/browserify';

const dependencies = [ 'runTests' ];

const run = browserify.watch;

export default {
  dependencies,
  run
};
