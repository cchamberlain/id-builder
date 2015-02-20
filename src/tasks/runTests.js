'use strict';

const tests = require('../lib/tests');

module.exports = {
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
