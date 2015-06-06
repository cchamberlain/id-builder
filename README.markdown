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

2. Create a file with any name in your project for example `idBuilder.js`.
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
    // debug, info, warn, error
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
    },

    watch: {
      enabled: true,
      paths: ['src', 'build']
    }
  }
});
```

## Tasks

### Clean
Removes all files from the build directory.

### Copy
Copies files that are not compiled to another format.

### Compile
These tasks all compile an input language to HTML, JavaScript or CSS.

#### Babel
Compiles ES6 to ES5.

#### Browserify
Compiles all Client code into one file. Uses
[Browserify](https://github.com/substack/node-browserify).

### Browsersync
Reloads the browser (or refreshes on CSS changes) when files change on disk that
are loaded in the browser. Allows you to connect many devices to the same site
and operate on them and reload them at the same time.

To use this functionality, you need to add a script to the page that serves the
app.bundle.js.

Start id-builder and go to http://localhost:9001 for the script to include.

#### CoffeeScript
Compiles CoffeeScript files to JavaScript.

#### Jade
Compiles Jade files to JavaScript.

#### Less
Compiles Less files to CSS.

#### LiveScript
Compiles LiveScript files to JavaScript.

#### Stylus
Compiles Stylus files to CSS.

### Run
These tasks run one or more processes to facilitate the development process.

#### Servers
Runs one or more servers used in your project. These run under separate
processes and are started/stopped/restarted together.

#### Tests
Runs all the tests. For now, the only output is to the console. Later this
could include growl style desktop notifications, etc.

### Watch
Watches for changes in the source and test directory and takes appropriate
actions. There is a separate watch task for each compile and run task. There is
only one watcher in your entire project to increase speed and not hit the
inodes limit.

## Planned Features

### Options

### Documentation
At some point it would be good to have an automated documentation facility.
The documentation would be JavaScript based so Languages that compile to
JavaScript should include the documentation in their output.

### Command Line
It would be nice to be able to start tasks (and all their dependencies before
them) based on a command line interface.

### Web Interface
Building on the command line interface, one of the commands could start a
webserver hosting a webapplication to manage process instead of having to use
the commandline.

Acting as a 'central hub' to your project, it could include code stats, test run
stats, complete control over all the processes that are running for your
project, running different environments (OTAP), etc.

### Continuous Integration & Deployment
Provide integration with CI and CD, allowing you to easily deploy new
versions of your code.

### Running one test suite at a time
