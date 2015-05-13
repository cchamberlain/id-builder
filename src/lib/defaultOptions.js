'use strict';

export default {
  //sourceDirectoryPath: 'src',
  //targetDirectoryPath: 'build',
  //testsDirectoryPath: 'build/tests',

  logging: {
    level: 'info'
  },

  tasks: {
    clean: {
      enabled: true,
      path: 'build'
    },

    compileBrowserify: {
      enabled: true,
      sourceDirectoryPath: 'build/client/js',
      sourceFilePath: 'build/client/js/app.js',
      targetFilePath: 'build/client/js/app.bundle.js'
    },

    compileCoffeescript: {
      enabled: true,
      sourceDirectoryPath: 'src',
      targetDirectoryPath: 'build'
    },

    compileLess: {
      enabled: true,
      sourceDirectoryPath: 'src/client/styles',
      sourceFilePath: 'src/client/styles/app.less',
      targetFilePath: 'build/client/styles/app.css'
    },

    compileLivescript: {
      enabled: true,
      sourceDirectoryPath: 'src',
      targetDirectoryPath: 'build'
    },

    compileBabel: {
      enabled: true,
      sourceDirectoryPath: 'src',
      targetDirectoryPath: 'build'
    },

    compileStylus: {
      enabled: true,
      sourceDirectoryPath: 'src/client',
      targetDirectoryPath: 'build/client'
    },

    compileCopy: {
      enabled: true,
      sourceDirectoryPath: 'src',
      targetDirectoryPath: 'build'
    },

    runBrowsersyncServer: {
      enabled: true
    },

    runServers: {
      enabled: true,
      sourceDirectoryPath: 'build/server',
      paths: ['app.js']
    },

    runTests: {
      enabled: true,
      sourceDirectoryPath: 'build/test',
      reporter: 'spec'
    },

    watchBrowserify: {
      enabled: true,
      sourceDirectoryPath: 'build/client/js',
      sourceFilePath: 'build/client/js/app.js',
      targetFilePath: 'build/client/js/app.bundle.js'
    },

    watchBrowsersync: {
      enabled: true,
      sourceDirectoryPath: 'build/client'
    },

    watchCoffeescript: {
      enabled: true,
      sourceDirectoryPath: 'src',
      targetDirectoryPath: 'build'
    },

    watchLess: {
      enabled: true,
      sourceDirectoryPath: 'src/client/styles',
      sourceFilePath: 'src/client/styles/app.less',
      targetFilePath: 'build/client/styles/app.css'
    },

    watchLivescript: {
      enabled: true,
      sourceDirectoryPath: 'src',
      targetDirectoryPath: 'build'
    },

    watchServers: {
      enabled: true,
      sourceDirectoryPath: 'build/server',
      paths: ['app.js']
    },

    watchTests: {
      enabled: true,
      watchDirectoryPath: 'build',
      sourceDirectoryPath: 'build/test',
      reporter: 'spec'
    },

    watchBabel: {
      enabled: true,
      sourceDirectoryPath: 'src',
      targetDirectoryPath: 'build'
    },

    watchStylus: {
      enabled: true,
      sourceDirectoryPath: 'src/client',
      targetDirectoryPath: 'build/client'
    },

    watchCopy: {
      enabled: true,
      sourceDirectoryPath: 'src',
      targetDirectoryPath: 'build'
    },

    watch: {
      enabled: true,
      paths: ['src', 'build']
    }
  }
};
