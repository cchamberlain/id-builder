'use strict';

// TODO: before program exit clean up children.

const servers = require('../lib/servers');

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
  run: servers.runServers
};
