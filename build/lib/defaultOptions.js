'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = {
  logging: {
    level: 'info'
  },

  paths: {
    source: 'src',
    target: 'build',

    client: {
      source: '{paths.source}/client',
      target: '{paths.target}/client'
    },

    common: {
      source: '{paths.source}/common',
      target: '{paths.target}/common'
    },

    server: {
      source: '{paths.source}/server',
      target: '{paths.target}/server'
    },

    test: {
      source: '{paths.source}/test',
      target: '{paths.target}/test'
    }
  },

  tasks: {
    DirectoryCleanerTask: {
      enabled: true,

      dependencies: [],

      paths: ['{paths.target}']
    },

    BabelCodeCompileTask: {
      enabled: true,

      dependencies: ['DirectoryCleanerTask'],

      sourceFileExtension: 'js',
      targetFileExtension: 'js',
      sourceDirectoryPath: '{paths.source}',
      targetDirectoryPath: '{paths.target}',

      compiler: {
        sourceMaps: 'inline',
        optional: []
      }
    },

    CoffeeScriptCompileTask: {
      enabled: true,

      dependencies: ['DirectoryCleanerTask'],

      sourceFileExtension: 'coffee',
      targetFileExtension: 'js',
      sourceDirectoryPath: '{paths.source}',
      targetDirectoryPath: '{paths.target}',

      compiler: {
        bare: true
      }
    },

    LiveScriptCompileTask: {
      enabled: true,

      dependencies: ['DirectoryCleanerTask'],

      sourceFileExtension: 'ls',
      targetFileExtension: 'js',
      sourceDirectoryPath: '{paths.source}',
      targetDirectoryPath: '{paths.target}',

      compiler: {
        bare: true
      }
    },

    LessCompileTask: {
      enabled: true,

      dependencies: ['DirectoryCleanerTask'],

      sourceFilePath: '{paths.client.source}/less/app.less',
      targetFilePath: '{paths.client.target}/css/app.css',
      sourceFileExtension: 'less',
      targetFileExtension: 'css',
      sourceDirectoryPath: '{paths.source}',
      targetDirectoryPath: '{paths.target}',

      compiler: {
        rootPath: '{paths.client.source}/less',
        filename: '{paths.client.source}/less/app.less'
      }
    },

    BrowserifyCompileTask: {
      enabled: true,

      dependencies: ['BabelCodeCompileTask', 'CoffeeScriptCompileTask', 'LessCompileTask', 'LiveScriptCompileTask'],

      sourceFilePath: '{paths.client.target}/js/app.js',
      targetFilePath: '{paths.client.target}/js/app.bundle.js',
      sourceFileExtension: 'js',
      targetFileExtension: 'js',
      sourceDirectoryPath: '{paths.client.target}',
      targetDirectoryPath: '{paths.client.target}',

      compiler: {
        fullPaths: true,
        debug: true
      }
    },

    StylusCompileTask: {
      enabled: true,

      dependencies: ['DirectoryCleanerTask'],

      sourceFilePath: '{paths.client.source}/stylus/app.styl',
      targetFilePath: '{paths.client.target}/css/app.css',
      sourceFileExtension: 'styl',
      targetFileExtension: 'css',
      sourceDirectoryPath: '{paths.source}',
      targetDirectoryPath: '{paths.target}',

      compiler: {}
    },

    CopyCompileTask: {
      enabled: true,

      dependencies: ['DirectoryCleanerTask'],

      sourceDirectoryPath: '{paths.source}',
      targetDirectoryPath: '{paths.target}'
    },

    BrowserSyncServerTask: {
      enabled: true,

      dependencies: ['DirectoryCleanerTask'],

      paths: ['{paths.target}'],

      options: {
        ui: {
          port: 9001
        },

        port: 9000,
        logLevel: 'silent',
        logFileChanges: false
      }
    },

    ServerTask: {
      enabled: true,

      dependencies: ['TestTask'],

      // Since this isn't a CompileTask, this property could be changed into a
      // `sourceDirectoryPaths` property that lists multiple. This way, only the
      // paths in the 'common' and 'server' directories are triggering server
      // reloads.
      sourceDirectoryPaths: ['{paths.server.target}'],

      paths: ['{paths.server.target}/app.js']
    },

    TestTask: {
      enabled: true,

      dependencies: ['BrowserifyCompileTask'],

      sourceDirectoryPaths: ['{paths.test.target}'],

      watchDirectoryPaths: ['{paths.target}'],

      mocha: {
        reporter: 'min'
      }
    },

    WatchTask: {
      enabled: true,

      dependencies: ['TestTask'],

      // sourceDirectoryPath: '{paths.target}',

      paths: ['{paths.source}', '{paths.target}']
    }
  }
};
module.exports = exports['default'];