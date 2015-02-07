var fs = require("fs");

var mkdirp = require("mkdirp");
var async = require("async");
var lsr = require("lsr");
var prelude = require("prelude-ls");

var browserify = require("./browserify");
var coffeescript = require("./coffeescript");
var fileSystem = require("./fileSystem");
var jade = require("./jade");
var less = require("./less");
var livescript = require("./livescript");
var logging = require("./logging");
var stylus = require("./stylus");

var globalOptions = global.options;

var sourceFilePathMatches = sourceFilePathMatches = function(options, sourceFilePath) {
  if (browserify.sourceFilePathMatches(globalOptions.tasks.watchBrowserify, sourceFilePath)) {
    return false;
  } else if (coffeescript.sourceFilePathMatches(globalOptions.tasks.watchCoffeescript, sourceFilePath)) {
    return false;
  } else if (jade.sourceFilePathMatches(globalOptions.tasks.watchJade, sourceFilePath)) {
    return false;
  } else if (less.sourceFilePathMatches(globalOptions.tasks.watchLess, sourceFilePath)) {
    return false;
  } else if (livescript.sourceFilePathMatches(globalOptions.tasks.watchLivescript, sourceFilePath)) {
    return false;
  } else if (stylus.sourceFilePathMatches(globalOptions.tasks.watchStylus, sourceFilePath)) {
    return false;
  } else if (!!sourceFilePath.match(RegExp(`^${options.sourcePath}`))) {
    return true;
  } else {
    return false;
  }
};

var copyFile = copyFile = function(options, sourceFilePath, targetFilePath, cb) {
  fs.readFile(sourceFilePath, function(e, readChunk){
    if (e) {
      return cb(e);
    }

    fileSystem.ensureFileDirectory(targetFilePath, function(e){
      if (e) {
        return cb(e);
      }

      fs.writeFile(targetFilePath, readChunk, function(e){
        if (e) {
          return cb(e);
        }

        logging.taskInfo(options.taskName, `${sourceFilePath} => ${targetFilePath}`);

        cb(null);
      });
    });
  });
};

var copyAllFiles = copyAllFiles = function(options, cb) {
  lsr(options.sourcePath, function(e, nodes){
    if (e) {
      return cb(e);
    }

    var paths = [];
    var i = nodes.length;
    var v;
    while (i--) {
      v = nodes[i];

      if (!v.isDirectory() && sourceFilePathMatches(options, v.fullPath)) {
        paths.push(v.fullPath);
      }
    }

    var iteratePath = function(currentSourceDirectoryPath, cb){
      var currentTargetDirectoryPath = currentSourceDirectoryPath.replace(options.sourcePath, options.targetPath);

      copyFile(options, currentSourceDirectoryPath, currentTargetDirectoryPath, cb);
    };

    async.each(paths, iteratePath, function(e){
      if (e) {
        return cb(e);
      }

      cb(null);
    });
  });
};

module.exports = {
  sourceFilePathMatches: sourceFilePathMatches,
  copyFile: copyFile,
  copyAllFiles: copyAllFiles
};