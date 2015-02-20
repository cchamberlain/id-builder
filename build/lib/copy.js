"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _fs = require("fs");

var readFile = _fs.readFile;
var writeFile = _fs.writeFile;
var _ = _interopRequire(require("lodash"));

var each = require("async").each;
var lsr = _interopRequire(require("lsr"));

var babel = _interopRequireWildcard(require("./babel"));

var browserify = _interopRequireWildcard(require("./browserify"));

var coffeescript = _interopRequireWildcard(require("./coffeescript"));

var fileSystem = _interopRequireWildcard(require("./fileSystem"));

var jade = _interopRequireWildcard(require("./jade"));

var less = _interopRequireWildcard(require("./less"));

var livescript = _interopRequireWildcard(require("./livescript"));

var logging = _interopRequireWildcard(require("./logging"));

var stylus = _interopRequireWildcard(require("./stylus"));

var sourceFilePathMatches = exports.sourceFilePathMatches = function (options, sourceFilePath) {
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
  } else if (babel.sourceFilePathMatches(globalOptions.tasks.compileBabel, sourceFilePath)) {
    return false;
  } else if (stylus.sourceFilePathMatches(globalOptions.tasks.compileStylus, sourceFilePath)) {
    return false;
  } else if (sourceFilePath && !!sourceFilePath.match(RegExp("^" + options.sourcePath))) {
    return true;
  } else {
    return false;
  }
};

var copyFile = exports.copyFile = function (options, sourceFilePath, targetFilePath, cb) {
  readFile(sourceFilePath, function (e, readChunk) {
    if (e) {
      return cb(e);
    }

    fileSystem.ensureFileDirectory(targetFilePath, function (e) {
      if (e) {
        return cb(e);
      }

      writeFile(targetFilePath, readChunk, function (e) {
        if (e) {
          return cb(e);
        }

        logging.taskInfo(options.taskName, "" + sourceFilePath + " => " + targetFilePath);

        cb(null);
      });
    });
  });
};

var copyAllFiles = exports.copyAllFiles = function (options, cb) {
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

    each(paths, iteratePath, function (e) {
      if (e) {
        return cb(e);
      }

      cb(null);
    });
  });
};
Object.defineProperty(exports, "__esModule", {
  value: true
});