var defaultSourceDirectory = "source";
var defaultTargetDirectory = "build";
var defaultOptions = {
  sourceDirectory: defaultSourceDirectory,
  targetDirectory: defaultTargetDirectory,
  tasks: {
    clean: {
      enabled: true,
      watch: true,
      path: "targetDirectory"
    },
    copy: {
      enabled: true,
      watch: true,
      sourcePath: "sourceDirectory",
      targetPath: "targetDirectory"
    },
    compileBrowserify: {
      enabled: true,
      watch: true,
      sourcePath: "sourceDirectory/client/app.js",
      targetPath: "targetDirectory/client"
    },
    compileCoffeescript: {
      enabled: true,
      watch: true,
      sourcePath: "sourceDirectory",
      targetPath: "targetDirectory"
    },
    compileJade: {
      enabled: true,
      watch: true,
      sourcePath: "sourceDirectory",
      targetPath: "targetDirectory"
    },
    compileLess: {
      enabled: true,
      watch: true,
      sourcePath: "sourceDirectory",
      targetPath: "targetDirectory"
    },
    compileLivescript: {
      enabled: true,
      watch: true,
      sourcePath: "sourceDirectory",
      targetPath: "targetDirectory"
    },
    compileStylus: {
      enabled: true,
      watch: true,
      sourcePath: "sourceDirectory",
      targetPath: "targetDirectory"
    },
    documentation: {
      enabled: true,
      watch: true,
      sourcePath: "sourceDirectory",
      targetPath: "docs"
    },
    runServers: {
      enabled: true,
      watch: true,
      paths: ["targetDirectory/server/app.js"]
    },
    runTests: {
      enabled: true,
      watch: true
    },
    watch: {
      enabled: true,
      sourcePath: "sourceDirectory"
    }
  }
};

// Do some
var parseOptions = function(defaults, options) {
  // Do something that parses the options, correcting all the paths"
};

var builder = function(options) {
};

// Use with:
builder();

// Or:
builder({
  sourceDirectory: "sources",
  targetDirectory: "targets",
  tasks: {
    clean: {
      enabled: false
    },
    compileBrowserify: {
      sourcePath: "sourceDirectory/someOtherClientDir/app.js"
    }
  }
})
