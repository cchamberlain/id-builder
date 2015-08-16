import watch from '../lib/watch';

const dependencies = [ 'runTests' ];

function run(options, cb) {
  watch.start(options);
  cb();
}

export default {
  dependencies,
  run
};
