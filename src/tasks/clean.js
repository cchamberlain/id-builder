import log from 'loglevel';
import async from 'async';
import rimraf from 'rimraf';

import logging from '../lib/logging';

const dependencies = [];

const run = function(options, cb) {
  async.each(options.paths, (path, cb) => {
    rimraf(path, cb);
  }, cb);
};

export default {
  dependencies,
  run
};
