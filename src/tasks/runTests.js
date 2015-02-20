'use strict';

import { runTests } from '../lib/tests';

export const dependencies = [
  'compileBrowserify',
  'compileCoffeescript',
  'compileCopy',
  'compileJade',
  'compileLess',
  'compileLivescript',
  'compileBabel',
  'compileStylus'
];

export const run = runTests
