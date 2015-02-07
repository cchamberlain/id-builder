"use strict";

module.exports = {
  sourceDirectory: "src",
  targetDirectory: "build",
  testsDirectory: "build/tests",

  tasks: {
    clean: {
      enabled: true,
      path: "build"
    },

    compileBrowserify: {
      enabled: true,
      sourceDirectory: "build/client/js",
      sourcePath: "build/client/js/app.js",
      targetPath: "build/client/js/app.bundle.js"
    },

    compileCoffeescript: {
      enabled: true,
      sourcePath: "src",
      targetPath: "build"
    },

    compileJade: {
      enabled: true,
      sourcePath: "src/client",
      targetPath: "build/client"
    },

    compileLess: {
      enabled: true,
      sourcePath: "src/client",
      targetPath: "build/client"
    },

    compileLivescript: {
      enabled: true,
      sourcePath: "src",
      targetPath: "build"
    },

    compileStylus: {
      enabled: true,
      sourcePath: "src/client",
      targetPath: "build/client"
    },

    compileCopy: {
      enabled: true,
      sourcePath: "src",
      targetPath: "build"
    },

    runBrowsersyncServer: {
      enabled: true
    },

    runServers: {
      enabled: true,
      sourcePath: "build/server",
      paths: ["app.js"]
    },

    runTests: {
      enabled: true,
      sourcePath: "build/test",
      reporter: "spec"
    },

    watchBrowserify: {
      enabled: true,
      sourceDirectory: "build/client/js",
      sourcePath: "build/client/js/app.js",
      targetPath: "build/client/js/app.bundle.js"
    },

    watchBrowsersync: {
      enabled: true,
      sourcePath: "build/client"
    },

    watchCoffeescript: {
      enabled: true,
      sourcePath: "src",
      targetPath: "build"
    },

    watchJade: {
      enabled: true,
      sourcePath: "src/client",
      targetPath: "build/client"
    },

    watchLess: {
      enabled: true,
      sourcePath: "src/client",
      targetPath: "build/client"
    },

    watchLivescript: {
      enabled: true,
      sourcePath: "src",
      targetPath: "build"
    },

    watchServers: {
      enabled: true,
      sourcePath: "build/server",
      paths: ["app.js"]
    },

    watchTests: {
      enabled: true,
      sourcePath: "build/test",
      reporter: "spec"
    },

    watchStylus: {
      enabled: true,
      sourcePath: "src/client",
      targetPath: "build/client"
    },

    watchCopy: {
      enabled: true,
      sourcePath: "src",
      targetPath: "build"
    },

    watch: {
      enabled: true,
      paths: ["src", "build"]
    }
  }
};