[![Build Status](https://travis-ci.org/Industrial/id-builder.svg?branch=master)](https://travis-ci.org/Industrial/id-builder)

# id-builder
id-builder compiles your code, runs your tests and servers, recompiles and
restarts on changes and reloads the browser for you.

## Getting Started
1. id-builder assumes the following directory structure but all paths can be configured to point to a different location.
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
  tasks: {
    clean: {
      enabled: true,
      path: 'build'
    },

    compileBabel: {
      enabled: true,
      sourcePath: 'src',
      targetPath: 'build'
    },

    compileBrowserify: {
      enabled: true,
      sourceDirectory: 'build/client/js',
      sourcePath: 'build/client/js/app.js',
      targetPath: 'build/client/js/app.bundle.js'
    },

    compileCoffeescript: {
      enabled: true,
      sourcePath: 'src',
      targetPath: 'build'
    },

    compileJade: {
      enabled: true,
      sourcePath: 'src/client',
      targetPath: 'build/client'
    },

    compileLess: {
      enabled: true,
      sourcePath: 'src/client',
      targetPath: 'build/client'
    },

    compileLivescript: {
      enabled: true,
      sourcePath: 'src',
      targetPath: 'build'
    },

    compileStylus: {
      enabled: true,
      sourcePath: 'src/client',
      targetPath: 'build/client'
    },

    compileCopy: {
      enabled: true,
      sourcePath: 'src',
      targetPath: 'build'
    },

    runBrowsersyncServer: {
      enabled: true
    },

    runServers: {
      enabled: true,
      sourcePath: 'build/server',
      paths: ['app.js']
    },

    runTests: {
      enabled: true,
      sourcePath: 'build/test',
      reporter: 'spec'
    },

    watchBabel: {
      enabled: true,
      sourcePath: 'src',
      targetPath: 'build'
    },

    watchBrowserify: {
      enabled: true,
      sourceDirectory: 'build/client/js',
      sourcePath: 'build/client/js/app.js',
      targetPath: 'build/client/js/app.bundle.js'
    },

    watchBrowsersync: {
      enabled: true,
      sourcePath: 'build/client'
    },

    watchCoffeescript: {
      enabled: true,
      sourcePath: 'src',
      targetPath: 'build'
    },

    watchJade: {
      enabled: true,
      sourcePath: 'src/client',
      targetPath: 'build/client'
    },

    watchLess: {
      enabled: true,
      sourcePath: 'src/client',
      targetPath: 'build/client'
    },

    watchLivescript: {
      enabled: true,
      sourcePath: 'src',
      targetPath: 'build'
    },

    watchServers: {
      enabled: true,
      sourcePath: 'build/server',
      paths: ['app.js']
    },

    watchTests: {
      enabled: true,
      sourcePath: 'build/test',
      reporter: 'spec'
    },

    watchStylus: {
      enabled: true,
      sourcePath: 'src/client',
      targetPath: 'build/client'
    },

    watchCopy: {
      enabled: true,
      sourcePath: 'src',
      targetPath: 'build'
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

#### Paths
It would be a good idea to have root paths configured so other paths may be
specified relative to these root paths. I'm not sure how to make these paths
both configurable and DRY other then putting variables in the paths;

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
