'use strict';

export default {
  clean: require('./clean'),
  compileBabel: require('./compileBabel'),
  compileBrowserify: require('./compileBrowserify'),
  compileCoffeescript: require('./compileCoffeescript'),
  compileCopy: require('./compileCopy'),
  compileJade: require('./compileJade'),
  compileLess: require('./compileLess'),
  compileLivescript: require('./compileLivescript'),
  compileStylus: require('./compileStylus'),
  runBrowsersyncServer: require('./runBrowsersyncServer'),
  runServers: require('./runServers'),
  runTests: require('./runTests'),
  watch: require('./watch'),
  watchBabel: require('./watchBabel'),
  watchBrowserify: require('./watchBrowserify'),
  watchBrowsersync: require('./watchBrowsersync'),
  watchCoffeescript: require('./watchCoffeescript'),
  watchCopy: require('./watchCopy'),
  watchJade: require('./watchJade'),
  watchLess: require('./watchLess'),
  watchLivescript: require('./watchLivescript'),
  watchServers: require('./watchServers'),
  watchStylus: require('./watchStylus'),
  watchTests: require('./watchTests')
};
