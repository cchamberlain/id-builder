'use strict';

import { runServer } from '../lib/browsersync';

export const dependencies = [
  'compileBrowserify',
  'compileCoffeescript',
  'compileCopy',
  'compileJade',
  'compileLess',
  'compileLivescript',
  'compileBabel',
  'compileStylus',
];

export const run = runServer
