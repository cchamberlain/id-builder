![Travis CI](https://travis-ci.org/Industrial/Builder.svg)

# Builder
Builder compiles your code, runs your tests and servers, recompiles on changes
and reloads the browser for you.

## Getting Started
1. Builder assumes the follwing directory structure:
  ```
  source/
    client/
      app.js/ls/coffee
    server/
      app.js/ls/coffee
  build/
  test/
  ```

2. Create a file with any name in your project for example `builder.js`.
   ```javascript
   var builder = require("builder");

   builder();
   ```
3. Run the file.
  ```bash
  node builder.js

  ```

## API
### builder([options]);
Takes an optional options object. By default, all tasks are enabled.

Default options:
```javascript
builder({
  sourceDirectory: "source", // Directory to compile from.
  targetDirectory: "build",  // Directory to compile to.

  tasks: {
    clean: {
      enabled: true,
      path:    "targetDirectory",
    },
    copy: {
      enabled:    true,
      sourcePath: "sourceDirectory",
      targetPath: "targetDirectory"
    },
    compile: {
      browserify: {
        enabled:    true,
        sourcePath: "sourceDirectory/client/app.js",
        targetPath: "targetDirectory/client"
      },
      coffeescript: {
        enabled:    true,
        sourcePath: "sourceDirectory",
        targetPath: "targetDirectory"
      },
      documentation: {
        enabled:    true,
        sourcePath: "sourceDirectory",
        targetPath: "targetDirectory"
      },
      jade: {
        enabled:    true,
        sourcePath: "sourceDirectory",
        targetPath: "targetDirectory"
      },
      less: {
        enabled:    true,
        sourcePath: "sourceDirectory",
        targetPath: "targetDirectory"
      },
      livescript: {
        enabled:    true,
        sourcePath: "sourceDirectory",
        targetPath: "targetDirectory"
      },
      stylus: {
        enabled:    true,
        sourcePath: "sourceDirectory",
        targetPath: "targetDirectory"
      },
    },
    run: {
      servers: {
        enabled: true,
        paths: [
          "targetDirectory/server/app.js"
        ]
      },
      tests: {
        enabled: true,
      },
    }
  }
});
```

## Tasks
TODO: How will the asynchronous dependency resolving of tasks work? Just use
async.auto?

### Clean
Removes all files from the build directory.

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
