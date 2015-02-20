'use strict';

// TODO: before program exit clean up children.

const servers = require('../lib/servers');

export default {
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
