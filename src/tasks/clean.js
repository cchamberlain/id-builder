import async from 'async';
import rimraf from 'rimraf';

const dependencies = [];

function run(options, cb) {
  async.each(options.paths, (path, cb) => {
    rimraf(path, cb);
  }, cb);
}

export default {
  dependencies,
  run
};
