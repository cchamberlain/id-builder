// Because idBuilder is itself written in ES6, use the babel register require
// call here to be able to run the ES6 code directly from here.
require('babel/register');

var idBuilder = require('./src');

idBuilder({
  logging: {
    // trace, debug, info, warn, error
    level: 'info'
  },

  tasks: {
    compileBrowserify: {
      enabled: false
    },

    compileCoffeescript: {
      enabled: false
    },

    compileLess: {
      enabled: false
    },

    compileLivescript: {
      enabled: false
    },

    compileStylus: {
      enabled: false
    },

    compileWebpack: {
      enabled: false
    },

    runBrowsersyncServer: {
      enabled: false
    },

    runServers: {
      enabled: false
    },

    runTests: {
      reporter: 'spec'
    },

    watchBrowserify: {
      enabled: false
    },

    watchBrowsersync: {
      enabled: false
    },

    watchCoffeescript: {
      enabled: false
    },

    watchLess: {
      enabled: false
    },

    watchLivescript: {
      enabled: false
    },

    watchStylus: {
      enabled: false
    },

    watchServers: {
      enabled: false
    },

    watchTests: {
      reporter: 'min'
    },

    watchWebpack: {
      enabled: false
    }
  }
}, function afterIdBuilder(e) {
  if (e) {
    console.error(e.stack || e.message || e);
  }

  process.exit();
});
