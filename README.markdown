![Travis CI](https://travis-ci.org/Industrial/Builder.svg)

# Builder
Builder compiles your code, runs your tests and servers, recompiles and
restarts on changes and reloads the browser for you.

## Getting Started
1. Builder assumes the follwing directory structure (but that can be changed):
  ```
  // Source Directory
  src/
    client/
      app.ls/coffee
    server/
      app.ls/coffee
    tests/
      anything.ls/coffee

  // Target Directory (created automatically)
  build/
    client/
      app.js
    server/
      app.js
    tests/
      anything.js
  ```

2. Create a file with any name in your project for example `Builder.js`.
   ```javascript
   var Builder = require("Builder");

   Builder();
   ```

   or just

   ```javascript
   require("Builder")();
   ```

3. Run the file.
  ```bash
  node Builder.js

  ```

## API
### builder([options]);
Takes an optional options object. By default, all tasks are enabled.

Default options:
```javascript
builder({
  // These aren't used at the moment.
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
