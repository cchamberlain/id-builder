'use strict';

import { runTests } from '../lib/tests';

export const dependencies = [
  'compileBabel',
  'compileBrowserify',
  'compileCoffeescript',
  'compileCopy',
  'compileJade',
  'compileLess',
  'compileLivescript',
  'compileStylus'
];

export const run = runTests;
