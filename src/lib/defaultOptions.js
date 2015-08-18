export default {
  logging: {
    level: 'info'
  },

  tasks: {
    DirectoryCleaner: {
      enabled: true,

      paths: [ 'build' ]
    },

    BabelCompile: {
      enabled: true,

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

      sourceDirectoryPath: 'src',
      targetDirectoryPath: 'build'
    }
  }
};
