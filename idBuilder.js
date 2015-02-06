// For now, while rewriting, require livescript.
require("LiveScript");

var idBuilder = require("./src");

idBuilder({
  tasks: {
    clean: {
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

    compileJade: {
      enabled: false
    },

    compileLess: {
      enabled: false
    },

    compileLivescript: {
      enabled: true
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

    watchBrowserify: {
      enabled: false
    },

    watchBrowsersync: {
      enabled: false
    },

    watchCoffeescript: {
      enabled: false
    },

    watchJade: {
      enabled: false
    },

    watchLess: {
      enabled: false
    },

    watchLivescript: {
      enabled: true
    },

    watchStylus: {
      enabled: false
    },

    watchServers: {
      enabled: false
    },

    watchCopy: {
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

  console.log("Done!")
});