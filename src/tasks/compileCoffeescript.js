'use strict';

const coffeescript = require('../lib/coffeescript')

export default {
  dependencies: [ 'clean' ],
  run: coffeescript.compileAllFiles
};
