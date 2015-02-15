"use strict";

var fs = require("fs");

var _ = require("lodash");
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
var sixToFive = require("./sixToFive");
var stylus = require("./stylus");

var sourceFilePathMatches = function (options, sourceFilePath) {
  var globalOptions = global.options;

  if (browserify.sourceFilePathMatches(globalOptions.tasks.compileBrowserify, sourceFilePath)) {
    return false;
  } else if (coffeescript.sourceFilePathMatches(globalOptions.tasks.compileCoffeescript, sourceFilePath)) {
    return false;
  } else if (jade.sourceFilePathMatches(globalOptions.tasks.compileJade, sourceFilePath)) {
    return false;
  } else if (less.sourceFilePathMatches(globalOptions.tasks.compileLess, sourceFilePath)) {
    return false;
  } else if (livescript.sourceFilePathMatches(globalOptions.tasks.compileLivescript, sourceFilePath)) {
    return false;
  } else if (sixToFive.sourceFilePathMatches(globalOptions.tasks.compileSixToFive, sourceFilePath)) {
    return false;
  } else if (stylus.sourceFilePathMatches(globalOptions.tasks.compileStylus, sourceFilePath)) {
    return false;
  } else if (sourceFilePath && !!sourceFilePath.match(RegExp("^" + options.sourcePath))) {
    return true;
  } else {
    return false;
  }
};

var copyFile = function (options, sourceFilePath, targetFilePath, cb) {
  fs.readFile(sourceFilePath, function (e, readChunk) {
    if (e) {
      return cb(e);
    }

    fileSystem.ensureFileDirectory(targetFilePath, function (e) {
      if (e) {
        return cb(e);
      }

      fs.writeFile(targetFilePath, readChunk, function (e) {
        if (e) {
          return cb(e);
        }

        logging.taskInfo(options.taskName, "" + sourceFilePath + " => " + targetFilePath);

        cb(null);
      });
    });
  });
};

var copyAllFiles = function (options, cb) {
  lsr(options.sourcePath, function (e, nodes) {
    if (e) {
      return cb(e);
    }

    var paths = _(nodes).filter(function (v) {
      return !v.isDirectory() && sourceFilePathMatches(options, v.fullPath);
    }).map(function (v) {
      return v.fullPath;
    }).value();

    var iteratePath = function (currentSourceDirectoryPath, cb) {
      var currentTargetDirectoryPath = currentSourceDirectoryPath.replace(options.sourcePath, options.targetPath);

      copyFile(options, currentSourceDirectoryPath, currentTargetDirectoryPath, cb);
    };

    async.each(paths, iteratePath, function (e) {
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