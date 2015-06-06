'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
'use strict';

exports['default'] = {
  //sourceDirectoryPath: 'src',
  //targetDirectoryPath: 'build',
  //testsDirectoryPath: 'build/tests',

  logging: {
    level: 'info'
  },

  tasks: {
    clean: {
      enabled: true,
      paths: ['build']
    },

    compileBrowserify: {
      enabled: true,
      sourceDirectoryPath: 'build/client/js',
      sourceFilePath: 'build/client/js/app.js',
      targetFilePath: 'build/client/js/app.browserify.js'
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

    compileWebpack: {
      enabled: true,

      options: {
        context: 'build/client/js',
        entry: 'build/client/js/app.js',

        output: {
          path: 'build/client/js',
          filename: 'app.webpack.js'
        }
      }
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
      targetFilePath: 'build/client/js/app.browserify.js'
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
      watchPaths: [],
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

    // TODO
    watchWebpack: {
      enabled: true,

      options: {
        context: 'build/client/js',
        entry: 'build/client/js/app.js',

        output: {
          path: 'build/client/js',
          filename: 'app.webpack.js'
        }
      },

      watchOptions: {
        aggregateTimeout: 300,
        poll: false,
        initial: false
      }
    },

    watch: {
      enabled: true,
      paths: ['src', 'build']
    }
  }
};
module.exports = exports['default'];