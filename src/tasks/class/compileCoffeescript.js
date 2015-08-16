import coffeescript from '../lib/coffeescript';

const dependencies = [ 'clean' ];

const run = coffeescript.compileAllFiles;

export default {
  dependencies,
  run
};
