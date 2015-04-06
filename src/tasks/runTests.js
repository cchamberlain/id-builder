'use strict';

import log from 'loglevel';
import { runTests } from '../lib/tests';

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

const run = runTests;

export default {
  dependencies,
  run
};
