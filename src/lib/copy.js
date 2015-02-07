"use strict";

let fs = require("fs");

let mkdirp = require("mkdirp");
let async = require("async");
let lsr = require("lsr");
let prelude = require("prelude-ls");

let browserify = require("./browserify");
let coffeescript = require("./coffeescript");
let fileSystem = require("./fileSystem");
let jade = require("./jade");
let less = require("./less");
let livescript = require("./livescript");
let logging = require("./logging");
let stylus = require("./stylus");

let globalOptions = global.options;

let sourceFilePathMatches = function(options, sourceFilePath) {
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

let copyFile = function(options, sourceFilePath, targetFilePath, cb) {
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

let copyAllFiles = function(options, cb) {
  lsr(options.sourcePath, function(e, nodes){
    if (e) {
      return cb(e);
    }

    let paths = [];
    let i = nodes.length;
    let v;
    while (i--) {
      v = nodes[i];

      if (!v.isDirectory() && sourceFilePathMatches(options, v.fullPath)) {
        paths.push(v.fullPath);
      }
    }

    let iteratePath = function(currentSourceDirectoryPath, cb){
      let currentTargetDirectoryPath = currentSourceDirectoryPath.replace(options.sourcePath, options.targetPath);

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