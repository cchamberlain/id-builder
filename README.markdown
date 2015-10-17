[![Build Status](https://travis-ci.org/Industrial/id-builder.svg?branch=master)](https://travis-ci.org/Industrial/id-builder)

Contributions, Tickets and Pull Requests appreciated!

# id-builder

[![Join the chat at https://gitter.im/Industrial/id-builder](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/Industrial/id-builder?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
id-builder compiles your code, runs your tests and servers, recompiles and
restarts on changes and reloads the browser for you.

## Getting Started
1. id-builder assumes the following directory structure but all paths can be
   configured to point to a different location.
  ```
  // Source Directory
  src/
    client/
      app.js
    server/
      app.js
    tests/
      anything.js

  // Target Directory (created automatically)
  build/
    client/
      app.js
    server/
      app.js
    tests/
      anything.js
  ```

  so

  ```
  $ mkdir -p src/client src/server src/tests build;
  ```

2. Create a file with any name in your project for example `id-builder.js`.
   ```javascript
   var idBuilder = require('id-builder');

   idBuilder();
   ```

   or just

   ```javascript
   require('id-builder')();
   ```

3. Run the file.
  ```bash
  $ node id-builder.js

  ```

## API
### idBuilder([options]);
Takes an optional options object. By default, all tasks are enabled.

Default options:
```javascript
idBuilder({
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
        sourceMaps: 'inline',
        optional: [
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
        rootPath: 'src/client/less',
        filename: 'src/client/less/app.less'
      }
    },

    BrowserifyCompileTask: {
      enabled: true,

      dependencies: [
        'BabelCodeCompileTask',
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
        fullPaths: true,
        debug: true
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

      paths: [
        'build'
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

    ServerTask: {
      enabled: true,

      dependencies: [
        'TestTask'
      ],

      // Since this isn't a CompileTask, this property could be changed into a
      // `sourceDirectoryPaths` property that lists multiple. This way, only the
      // paths in the 'common' and 'server' directories are triggering server
      // reloads.
      sourceDirectoryPaths: [
        'build/server'
      ],

      paths: [ 'build/server/app.js' ]
    },

    TestTask: {
      enabled: true,

      dependencies: [
        'BrowserifyCompileTask'
      ],

      sourceDirectoryPaths: [
        'build/test'
      ],

      watchDirectoryPaths: [
        'build'
      ],

      mocha: {
        reporter: 'min'
      }
    },

    WatchTask: {
      enabled: true,

      dependencies: [
        'TestTask'
      ],

      // sourceDirectoryPath: 'build',

      paths: [
        'src',
        'build'
      ]
    }
  }
});
```
