'use strict';

const browsersync = require('../lib/browsersync');

export default {
  dependencies: [
    'compileBrowserify',
    'compileCoffeescript',
    'compileCopy',
    'compileJade',
    'compileLess',
    'compileLivescript',
    'compileBabel',
    'compileStylus',
  ],
  run: browsersync.runServer
};
