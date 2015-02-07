"use strict";

const fs = require("fs");

const _ = require("lodash");
const mkdirp = require("mkdirp");
const async = require("async");
const lsr = require("lsr");
const prelude = require("prelude-ls");

const browserify = require("./browserify");
const coffeescript = require("./coffeescript");
const fileSystem = require("./fileSystem");
const jade = require("./jade");
const less = require("./less");
const livescript = require("./livescript");
const logging = require("./logging");
const stylus = require("./stylus");

const globalOptions = global.options;

const sourceFilePathMatches = function(options, sourceFilePath) {
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

const copyFile = function(options, sourceFilePath, targetFilePath, cb) {
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

const copyAllFiles = function(options, cb) {
  lsr(options.sourcePath, function(e, nodes){
    if (e) {
      return cb(e);
    }

    const paths = _(nodes)
      .filter(function(v) {
        return !v.isDirectory() && sourceFilePathMatches(options, v.fullPath);
      })
      .map(function(v) {
        return v.fullPath;
      });

    const iteratePath = function(currentSourceDirectoryPath, cb){
      const currentTargetDirectoryPath = currentSourceDirectoryPath.replace(options.sourcePath, options.targetPath);

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