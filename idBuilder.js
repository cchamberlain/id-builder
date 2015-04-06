// Because idBuilder is itself written in ES6, use the babel register require
// call here to be able to run the ES6 code directly from here.
require('babel/register');

var idBuilder = require('./src');

idBuilder({
  tasks: {
    clean: {
      enabled: true
    },

    compileBabel: {
      enabled: true
    },

    compileBrowserify: {
      enabled: false
    },

    compileCoffeescript: {
      enabled: false
    },

    compileCopy: {
      enabled: true
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

    runBrowsersyncServer: {
      enabled: false
    },

    runServers: {
      enabled: false
    },

    runTests: {
      enabled: true
    },

    watchBabel: {
      enabled: true
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

    watchCopy: {
      enabled: true
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
      enabled: true
    },

    watch: {
      enabled: true
    }
  }
}, function afterIdBuilder(e) {
  if (e) {
    console.error(e.stack || e.message || e);
  }

  process.exit();
});
