![Travis CI](https://travis-ci.org/Industrial/Builder.svg)

# Builder
Builder compiles your code, runs your tests and servers, recompiles and
restarts on changes and reloads the browser for you.

## Getting Started
1. Builder assumes the follwing directory structure (but that can be changed):
  ```
  source/
  docs/
  build/
    client/
      app.js
    server/
      app.js
  test/
  ```

2. Create a file with any name in your project for example `Builder.js`.
   ```javascript
   var Builder = require("Builder");

   Builder();
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
  // At the moment, not really used. Fill it in anyway :P.
  sourceDirectory: "src", // Directory to compile from.
  targetDirectory: "build",  // Directory to compile to.

  tasks: {
    clean: {
      enabled: true,
      watch: true,
      path: "build"
    },
    copy: {
      enabled: true,
      watch: true,
      sourcePath: "src",
      targetPath: "build"
    },
    compileBrowserify: {
      enabled: true,
      watch: true,
      sourcePath: "build/client/js/app.js",
      targetPath: "build/client/js/app.bundle.js"
    },
    compileCoffeescript: {
      enabled: true,
      watch: true,
      sourcePath: "src",
      targetPath: "build"
    },
    compileJade: {
      enabled: true,
      watch: true,
      sourcePath: "src/client",
      targetPath: "build/client"
    },
    compileLess: {
      enabled: true,
      watch: true,
      sourcePath: "src/client",
      targetPath: "build/client"
    },
    compileLivescript: {
      enabled: true,
      watch: true,
      sourcePath: "src",
      targetPath: "build"
    },
    compileStylus: {
      enabled: true,
      watch: true,
      sourcePath: "src/client",
      targetPath: "build/client"
    },
    documentation: {
      enabled: true,
      watch: true,
      sourcePath: "src",
      targetPath: "docs"
    },
    runServers: {
      enabled: true,
      watch: true,
      sourcePath: "build/server",
      paths: ["app.js"]
    },
    runTests: {
      enabled: true,
      watch: true
    },
    watch: {
      enabled: true,
      paths: ['src', 'build', 'test']
    }
  }
});
```

## Tasks
TODO: How will the asynchronous dependency resolving of tasks work? Just use
async.auto?

### Clean
Removes all files from the build directory.

#### Copy
Copies files that are not compiled to another format.

#### Compile
These tasks all compile an input language to HTML, JavaScript or CSS.

##### Browserify
Compiles all Client code into one file. Uses
[Browserify](https://github.com/substack/node-browserify).

##### CoffeeScript
Compiles CoffeeScript files to JavaScript.

##### Jade
Compiles Jade files to JavaScript.

##### Less
Compiles Less files to CSS.

##### LiveScript
Compiles LiveScript files to JavaScript.

##### Stylus
Compiles Stylus files to CSS.

#### Documentation
Currently, no documentation system has been chosen.
TODO: Create a ticket about this to allow voting.
TODO: or just reseach and pick one.

#### Run
These tasks run one or more processes to facilitate the development process.

##### Server
Runs one or more servers used in your project. These run under separate
processes and are started/stopped/restarted together.

##### Tests
Runs all the tests. For now, the only output is to the console. Later this
could include growl style desktop notifications, etc.

#### Watch
Watches for changes in the source and test directory and takes appropriate
actions.
