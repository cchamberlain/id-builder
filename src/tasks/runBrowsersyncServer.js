'use strict';

const browsersync = require('../lib/browsersync');

module.exports = {
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
