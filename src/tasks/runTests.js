'use strict';

const tests = require('../lib/tests');

export default {
  dependencies: [
    'compileBrowserify',
    'compileCoffeescript',
    'compileCopy',
    'compileJade',
    'compileLess',
    'compileLivescript',
    'compileBabel',
    'compileStylus'
  ],
  run: tests.runTests
};
