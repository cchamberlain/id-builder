'use strict';

module.exports = {
  clean: require('./clean'),
  compileBrowserify: require('./compileBrowserify'),
  compileCoffeescript: require('./compileCoffeescript'),
  compileCopy: require('./compileCopy'),
  compileJade: require('./compileJade'),
  compileLess: require('./compileLess'),
  compileLivescript: require('./compileLivescript'),
  compileBrowserify: require('./compileBabel'),
  compileStylus: require('./compileStylus'),
  runBrowsersyncServer: require('./runBrowsersyncServer'),
  runServers: require('./runServers'),
  runTests: require('./runTests'),
  watch: require('./watch'),
  watchBrowserify: require('./watchBrowserify'),
  watchBrowsersync: require('./watchBrowsersync'),
  watchCoffeescript: require('./watchCoffeescript'),
  watchCopy: require('./watchCopy'),
  watchJade: require('./watchJade'),
  watchLess: require('./watchLess'),
  watchLivescript: require('./watchLivescript'),
  watchServers: require('./watchServers'),
  watchBabel: require('./watchBabel'),
  watchStylus: require('./watchStylus'),
  watchTests: require('./watchTests')
};
