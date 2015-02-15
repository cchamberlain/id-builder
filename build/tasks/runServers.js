"use strict";

// TODO: before program exit clean up children.

var servers = require("../lib/servers");

module.exports = {
  dependencies: ["compileBrowserify", "compileCoffeescript", "compileCopy", "compileJade", "compileLess", "compileLivescript", "compileStylus"],
  run: servers.runServers
};