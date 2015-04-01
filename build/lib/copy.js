"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
"use strict";

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

var log = _interopRequireWildcard(require("./log"));

var stylus = _interopRequireWildcard(require("./stylus"));

var sourceFilePathMatches = function sourceFilePathMatches(options, sourceFilePath) {
  var globalOptions = global.options;

  var result = undefined;

  if (browserify.sourceFilePathMatches(globalOptions.tasks.compileBrowserify, sourceFilePath)) {
    result = false;
  } else if (coffeescript.sourceFilePathMatches(globalOptions.tasks.compileCoffeescript, sourceFilePath)) {
    result = false;
  } else if (jade.sourceFilePathMatches(globalOptions.tasks.compileJade, sourceFilePath)) {
    result = false;
  } else if (less.sourceFilePathMatches(globalOptions.tasks.compileLess, sourceFilePath)) {
    result = false;
  } else if (livescript.sourceFilePathMatches(globalOptions.tasks.compileLivescript, sourceFilePath)) {
    result = false;
  } else if (babel.sourceFilePathMatches(globalOptions.tasks.compileBabel, sourceFilePath)) {
    result = false;
  } else if (stylus.sourceFilePathMatches(globalOptions.tasks.compileStylus, sourceFilePath)) {
    result = false;
  } else if (sourceFilePath && !!sourceFilePath.match(RegExp("^" + options.sourcePath))) {
    result = true;
  } else {
    result = false;
  }

  log.debug("copy.sourceFilePathMatches =>", result, sourceFilePath);

  return result;
};

exports.sourceFilePathMatches = sourceFilePathMatches;
var copyFile = function copyFile(options, sourceFilePath, targetFilePath, cb) {
  log.debug("copy.copyFile", sourceFilePath, targetFilePath);

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

        log.taskInfo(options.taskName, "" + sourceFilePath + " => " + targetFilePath);

        cb(null);
      });
    });
  });
};

exports.copyFile = copyFile;
var copyAllFiles = function copyAllFiles(options, cb) {
  log.debug("copy.copyAllFiles", options.sourcePath);

  lsr(options.sourcePath, function (e, nodes) {
    if (e) {
      return cb(e);
    }

    var paths = _(nodes).filter(function (v) {
      return !v.isDirectory() && sourceFilePathMatches(options, v.fullPath);
    }).map(function (v) {
      return v.fullPath;
    }).value();

    var iteratePath = function iteratePath(currentSourceDirectoryPath, cb) {
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
exports.copyAllFiles = copyAllFiles;