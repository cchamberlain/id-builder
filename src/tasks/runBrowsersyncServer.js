'use strict';

import log from '../lib/logging';
import browsersync from '../lib/browsersync';

const dependencies = [
  'compileBabel',
  'compileBrowserify',
  'compileCoffeescript',
  'compileCopy',
  'compileLess',
  'compileLivescript',
  'compileStylus'
];

const run = browsersync.runServer;

export default {
  dependencies,
  run
};
