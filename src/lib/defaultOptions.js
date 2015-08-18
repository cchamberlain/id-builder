export default {
  logging: {
    level: 'info'
  },

  tasks: {
    DirectoryCleaner: {
      enabled: true,

      dependencies: [
      ],

      paths: [ 'build' ]
    },

    BabelCompile: {
      enabled: true,

      dependencies: [
        'DirectoryCleaner'
      ],

      sourceFileExtension: 'js',
      targetFileExtension: 'js',
      sourceDirectoryPath: 'src',
      targetDirectoryPath: 'build',

      options: {
        optional: [
          'es7.asyncFunctions',
          'es7.decorators',
          'es7.exportExtensions',
          'es7.objectRestSpread',
          'es7.trailingFunctionCommas'
        ]
      }
    },

    CoffeeScriptCompile: {
      enabled: true,

      dependencies: [
        'DirectoryCleaner'
      ],

      sourceFileExtension: 'coffee',
      targetFileExtension: 'js',
      sourceDirectoryPath: 'src',
      targetDirectoryPath: 'build',

      options: {
        bare: true
      }
    },

    LiveScriptCompile: {
      enabled: true,

      dependencies: [
        'DirectoryCleaner'
      ],

      sourceFileExtension: 'ls',
      targetFileExtension: 'js',
      sourceDirectoryPath: 'src',
      targetDirectoryPath: 'build',

      options: {
        bare: true
      }
    },

    LessCompile: {
      enabled: true,

      dependencies: [
        'DirectoryCleaner'
      ],

      sourceFilePath: 'src/client/less/app.less',
      targetFilePath: 'build/client/css/app.css',
      sourceFileExtension: 'less',
      targetFileExtension: 'css',
      sourceDirectoryPath: 'src',
      targetDirectoryPath: 'build',

      options: {
        filename: './src/client/less/app.less'
      }
    },

    BrowserifyCompile: {
      enabled: true,

      dependencies: [
        'BabelCompile',
        'CoffeeScriptCompile',
        'LessCompile',
        'LiveScriptCompile'
      ],

      sourceFilePath: 'build/client/js/app.js',
      targetFilePath: 'build/client/js/app.bundle.js',
      sourceFileExtension: 'js',
      targetFileExtension: 'js',
      sourceDirectoryPath: 'build',
      targetDirectoryPath: 'build',

      options: {
        cache: {},
        // debug: true,
        fullPaths: true,
        packageCache: {}
      }
    },

    StylusCompile: {
      enabled: true,

      dependencies: [
        'DirectoryCleaner'
      ],

      sourceFilePath: 'src/client/stylus/app.styl',
      targetFilePath: 'build/client/css/app.css',
      sourceFileExtension: 'styl',
      targetFileExtension: 'css',
      sourceDirectoryPath: 'src',
      targetDirectoryPath: 'build',

      options: {}
    },

    Copy: {
      enabled: true,

      dependencies: [
        'DirectoryCleaner'
      ],

      sourceDirectoryPath: 'src',
      targetDirectoryPath: 'build'
    },

    BrowserSyncServer: {
      enabled: true,

      dependencies: [
        'DirectoryCleaner'
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

    AppServer: {
      enabled: true,

      dependencies: [
        'BrowserifyCompile'
      ],

      sourceDirectoryPath: 'build',

      paths: [ 'server/app.js' ]
    }
  }
};
