export default {
  logging: {
    level: 'info'
  },

  tasks: {
    DirectoryCleanerTask: {
      enabled: true,

      dependencies: [
      ],

      paths: [ 'build' ]
    },

    PlantUMLCompileTask: {
      enabled: true,

      dependencies: [
        'DirectoryCleanerTask'
      ],

      sourceFileExtension: 'js',
      sourceDirectoryPath: 'src',

      compiler: {
        ast: true,
        whitelist: []
      }
    },

    BabelASTCompileTask: {
      enabled: true,

      dependencies: [
        'DirectoryCleanerTask'
      ],

      sourceFileExtension: 'js',
      targetFileExtension: 'js.ast.json',
      sourceDirectoryPath: 'src',
      targetDirectoryPath: 'build',

      compiler: {
        optional: [
          'es7.asyncFunctions',
          'es7.decorators',
          'es7.exportExtensions',
          'es7.objectRestSpread',
          'es7.trailingFunctionCommas'
        ]
      }
    },

    BabelMapCompileTask: {
      enabled: true,

      dependencies: [
        'DirectoryCleanerTask'
      ],

      sourceFileExtension: 'js',
      targetFileExtension: 'js.map',
      sourceDirectoryPath: 'src',
      targetDirectoryPath: 'build',

      compiler: {
        optional: [
          'es7.asyncFunctions',
          'es7.decorators',
          'es7.exportExtensions',
          'es7.objectRestSpread',
          'es7.trailingFunctionCommas'
        ],
        sourceMaps: true
      }
    },

    BabelCodeCompileTask: {
      enabled: true,

      dependencies: [
        'DirectoryCleanerTask'
      ],

      sourceFileExtension: 'js',
      targetFileExtension: 'js',
      sourceDirectoryPath: 'src',
      targetDirectoryPath: 'build',

      compiler: {
        optional: [
          'es7.asyncFunctions',
          'es7.decorators',
          'es7.exportExtensions',
          'es7.objectRestSpread',
          'es7.trailingFunctionCommas'
        ]
      }
    },

    CoffeeScriptCompileTask: {
      enabled: true,

      dependencies: [
        'DirectoryCleanerTask'
      ],

      sourceFileExtension: 'coffee',
      targetFileExtension: 'js',
      sourceDirectoryPath: 'src',
      targetDirectoryPath: 'build',

      compiler: {
        bare: true
      }
    },

    LiveScriptCompileTask: {
      enabled: true,

      dependencies: [
        'DirectoryCleanerTask'
      ],

      sourceFileExtension: 'ls',
      targetFileExtension: 'js',
      sourceDirectoryPath: 'src',
      targetDirectoryPath: 'build',

      compiler: {
        bare: true
      }
    },

    LessCompileTask: {
      enabled: true,

      dependencies: [
        'DirectoryCleanerTask'
      ],

      sourceFilePath: 'src/client/less/app.less',
      targetFilePath: 'build/client/css/app.css',
      sourceFileExtension: 'less',
      targetFileExtension: 'css',
      sourceDirectoryPath: 'src',
      targetDirectoryPath: 'build',

      compiler: {
        filename: './src/client/less/app.less'
      }
    },

    BrowserifyCompileTask: {
      enabled: true,

      dependencies: [
        'BabelCodeCompileTask',
        'BabelMapCompileTask',
        'CoffeeScriptCompileTask',
        'LessCompileTask',
        'LiveScriptCompileTask'
      ],

      sourceFilePath: 'build/client/js/app.js',
      targetFilePath: 'build/client/js/app.bundle.js',
      sourceFileExtension: 'js',
      targetFileExtension: 'js',
      sourceDirectoryPath: 'build/client',
      targetDirectoryPath: 'build/client',

      compiler: {
        cache: {},
        // debug: true,
        fullPaths: true,
        packageCache: {}
      }
    },

    StylusCompileTask: {
      enabled: true,

      dependencies: [
        'DirectoryCleanerTask'
      ],

      sourceFilePath: 'src/client/stylus/app.styl',
      targetFilePath: 'build/client/css/app.css',
      sourceFileExtension: 'styl',
      targetFileExtension: 'css',
      sourceDirectoryPath: 'src',
      targetDirectoryPath: 'build',

      compiler: {}
    },

    CopyCompileTask: {
      enabled: true,

      dependencies: [
        'DirectoryCleanerTask'
      ],

      sourceDirectoryPath: 'src',
      targetDirectoryPath: 'build'
    },

    BrowserSyncServerTask: {
      enabled: true,

      dependencies: [
        'DirectoryCleanerTask'
      ],

      options: {
        ui: {
          port: 9001
        },

        port: 9000,
        logLevel: 'silent',
        logFileChanges: false
      }
    },

    AppServerTask: {
      enabled: true,

      dependencies: [
        'BrowserifyCompileTask'
      ],

      sourceDirectoryPath: 'build',

      paths: [ 'server/app.js' ]
    },

    WatchTask: {
      enabled: true,

      dependencies: [
        'BrowserifyCompileTask'
      ],

      // sourceDirectoryPath: 'build',

      paths: [
        'src',
        'build'
      ]
    }
  }
};
