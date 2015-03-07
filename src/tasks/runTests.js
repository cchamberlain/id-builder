'use strict';

import log from 'loglevel';
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
