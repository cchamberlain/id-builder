'use strict';

import logging from '../lib/logging';
import tests from '../lib/tests';

const dependencies = [
  'compileBabel',
  'compileBrowserify',
  'compileCoffeescript',
  'compileCopy',
  //'compileJade',
  'compileLess',
  'compileLivescript',
  'compileStylus'
];

const run = tests.runTests;

export default {
  dependencies,
  run
};
