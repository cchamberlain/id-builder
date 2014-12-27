// Generated by LiveScript 1.3.1
var path, async, idType, preludeLs, log, debug, info, warning, each, objToPairs, lib, tasks, defaultSourceDirectory, defaultTargetDirectory, defaultOptions, builder;
path = require("path");
async = require("async");
idType = require("id-type");
preludeLs = require("prelude-ls");
log = require("id-debug");
debug = log.debug, info = log.info, warning = log.warning;
each = preludeLs.each;
objToPairs = preludeLs.Obj.objToPairs;
lib = require("./lib");
tasks = require("./tasks");
defaultSourceDirectory = "src";
defaultTargetDirectory = "build";
defaultOptions = {
  sourceDirectory: defaultSourceDirectory,
  targetDirectory: defaultTargetDirectory,
  tasks: {
    clean: {
      enabled: true,
      watch: true,
      path: ""
    },
    copy: {
      enabled: true,
      watch: true,
      sourcePath: "",
      targetPath: ""
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
};
builder = function(options, cb){
  var parsedOptions, clean, compileBrowserify, compileCoffeescript, compileJade, compileLess, compileLivescript, compileStylus, copy, documentation, runServers, runTests, watch, done;
  options == null && (options = {});
  parsedOptions = lib.parseOptions.parse(defaultOptions, options);
  clean = function(cb){
    var task;
    task = parsedOptions.tasks.clean;
    if (!task.enabled) {
      info("| clean:disabled");
      return cb();
    }
    info("> clean");
    if (task.path === "") {
      task.path = parsedOptions.targetDirectory;
    }
    task.path = path.resolve(task.path);
    tasks.clean(parsedOptions, task, function(error){
      if (error) {
        return cb(error);
      }
      info("< clean");
      cb();
    });
  };
  compileBrowserify = function(cb){
    var task;
    task = parsedOptions.tasks.compileBrowserify;
    if (!task.enabled) {
      info("| compile-browserify:disabled");
      return cb();
    }
    info("> compile-browserify");
    task = parsedOptions.tasks.compileBrowserify;
    if (!task.enabled) {
      return cb();
    }
    if (task.sourcePath === "") {
      task.sourcePath = parsedOptions.sourceDirectory;
    }
    task.sourcePath = path.resolve(task.sourcePath);
    if (task.targetPath === "") {
      task.targetPath = parsedOptions.targetDirectory;
    }
    task.targetPath = path.resolve(task.targetPath);
    tasks.compileBrowserify.compileAllFiles(parsedOptions, task, function(error){
      if (error) {
        return cb(error);
      }
      info("< compile-browserify");
      cb();
    });
  };
  compileCoffeescript = function(cb){
    var task;
    task = parsedOptions.tasks.compileCoffeescript;
    if (!task.enabled) {
      info("| compile-coffeescript:disabled");
      return cb();
    }
    info("> compile-coffeescript");
    if (task.sourcePath === "") {
      task.sourcePath = parsedOptions.sourceDirectory;
    }
    task.sourcePath = path.resolve(task.sourcePath);
    if (task.targetPath === "") {
      task.targetPath = parsedOptions.targetDirectory;
    }
    task.targetPath = path.resolve(task.targetPath);
    tasks.compileCoffeescript.compileAllFiles(parsedOptions, task, function(error){
      if (error) {
        return cb(error);
      }
      info("< compile-coffeescript");
      cb();
    });
  };
  compileJade = function(cb){
    var task;
    task = parsedOptions.tasks.compileJade;
    if (!task.enabled) {
      info("| compile-jade:disabled");
      return cb();
    }
    info("> compile-jade");
    if (task.sourcePath === "") {
      task.sourcePath = parsedOptions.sourceDirectory;
    }
    task.sourcePath = path.resolve(task.sourcePath);
    if (task.targetPath === "") {
      task.targetPath = parsedOptions.targetDirectory;
    }
    task.targetPath = path.resolve(task.targetPath);
    tasks.compileJade.compileAllFiles(parsedOptions, task, function(error){
      if (error) {
        return cb(error);
      }
      info("< compile-jade");
      cb();
    });
  };
  compileLess = function(cb){
    var task;
    task = parsedOptions.tasks.compileLess;
    if (!task.enabled) {
      info("| compile-less:disabled");
      return cb();
    }
    info("> compile-less");
    if (task.sourcePath === "") {
      task.sourcePath = parsedOptions.sourceDirectory;
    }
    task.sourcePath = path.resolve(task.sourcePath);
    if (task.targetPath === "") {
      task.targetPath = parsedOptions.targetDirectory;
    }
    task.targetPath = path.resolve(task.targetPath);
    tasks.compileLess.compileAllFiles(parsedOptions, task, function(error){
      if (error) {
        return cb(error);
      }
      info("< compile-less");
      cb();
    });
  };
  compileLivescript = function(cb){
    var task;
    task = parsedOptions.tasks.compileLivescript;
    if (!task.enabled) {
      info("| compile-livescript:disabled");
      return cb();
    }
    info("> compile-livescript");
    if (task.sourcePath === "") {
      task.sourcePath = parsedOptions.sourceDirectory;
    }
    task.sourcePath = path.resolve(task.sourcePath);
    if (task.targetPath === "") {
      task.targetPath = parsedOptions.targetDirectory;
    }
    task.targetPath = path.resolve(task.targetPath);
    tasks.compileLivescript.compileAllFiles(parsedOptions, task, function(error){
      if (error) {
        return cb(error);
      }
      info("< compile-livescript");
      cb();
    });
  };
  compileStylus = function(cb){
    var task;
    task = parsedOptions.tasks.compileStylus;
    if (!task.enabled) {
      info("| compile-stylus:disabled");
      return cb();
    }
    info("> compile-stylus");
    if (task.sourcePath === "") {
      task.sourcePath = parsedOptions.sourceDirectory;
    }
    task.sourcePath = path.resolve(task.sourcePath);
    if (task.targetPath === "") {
      task.targetPath = parsedOptions.targetDirectory;
    }
    task.targetPath = path.resolve(task.targetPath);
    tasks.compileStylus.compileAllFiles(parsedOptions, task, function(error){
      if (error) {
        return cb(error);
      }
      info("< compile-stylus");
      cb();
    });
  };
  copy = function(cb){
    var task;
    task = parsedOptions.tasks.copy;
    if (!task.enabled) {
      info("| copy:disabled");
      return cb();
    }
    info("> copy");
    if (task.sourcePath === "") {
      task.sourcePath = parsedOptions.sourceDirectory;
    }
    task.sourcePath = path.resolve(task.sourcePath);
    if (task.targetPath === "") {
      task.targetPath = parsedOptions.targetDirectory;
    }
    task.targetPath = path.resolve(task.targetPath);
    tasks.copy.copyAllFiles(parsedOptions, task, function(error){
      if (error) {
        return cb(error);
      }
      info("< copy");
      cb();
    });
  };
  documentation = function(cb){
    var task;
    task = parsedOptions.tasks.documentation;
    if (!task.enabled) {
      info("| documentation:disabled");
      return cb();
    }
    info("> documentation");
    if (task.sourcePath === "") {
      task.sourcePath = parsedOptions.sourceDirectory;
    }
    task.sourcePath = path.resolve(task.sourcePath);
    if (task.targetPath === "") {
      task.targetPath = parsedOptions.targetDirectory;
    }
    task.targetPath = path.resolve(task.targetPath);
    info("< documentation");
    cb();
  };
  runServers = function(cb){
    var task;
    task = parsedOptions.tasks.runServers;
    if (!task.enabled) {
      info("| run-servers:disabled");
      return cb();
    }
    info("> run-servers");
    tasks.runServers.runServers(parsedOptions, task, function(error){
      if (error) {
        return cb(error);
      }
      info("< run-servers");
      cb();
    });
  };
  runTests = function(cb){
    info("> run-tests");
    info("< run-tests");
    cb();
  };
  watch = function(cb){
    var task;
    task = parsedOptions.tasks.watch;
    if (!task.enabled) {
      info("| watch:disabled");
      return cb();
    }
    info("> watch");
    tasks.watch(parsedOptions, task);
    cb();
  };
  done = function(cb){
    info("> done");
    info("< done");
    cb();
  };
  return clean(function(error){
    if (error) {
      return cb(error);
    }
    compileCoffeescript(function(error){
      if (error) {
        return cb(error);
      }
      compileLivescript(function(error){
        if (error) {
          return cb(error);
        }
        compileJade(function(error){
          if (error) {
            return cb(error);
          }
          copy(function(error){
            if (error) {
              return cb(error);
            }
            compileBrowserify(function(error){
              if (error) {
                return cb(error);
              }
              compileLess(function(error){
                if (error) {
                  return cb(error);
                }
                compileStylus(function(error){
                  if (error) {
                    return cb(error);
                  }
                  documentation(function(error){
                    if (error) {
                      return cb(error);
                    }
                    runServers(function(error){
                      if (error) {
                        return cb(error);
                      }
                      runTests(function(error){
                        if (error) {
                          return cb(error);
                        }
                        watch(function(error){
                          if (error) {
                            return cb(error);
                          }
                          cb();
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
};
module.exports = builder;