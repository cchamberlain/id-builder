"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var compile = require("coffee-script").compile;
var log = _interopRequireWildcard(require("./log"));

var fileSystem = _interopRequireWildcard(require("./fileSystem"));

var sourceExtension = exports.sourceExtension = "coffee";
var targetExtension = exports.targetExtension = "js";

var sourceFilePathMatches = exports.sourceFilePathMatches = function (options, sourceFilePath) {
  var result = !!sourceFilePath.match(RegExp("^" + options.sourcePath + ".+." + sourceExtension + "}"));

  log.debug("coffeescript.sourceFilePathMatches =>", result, sourceFilePath);

  return result;
};

var compileChunk = exports.compileChunk = function (options, chunk, cb) {
  log.debug("coffeescript.compileChunk", options);

  try {
    cb(null, compile(chunk, {
      bare: true
    }));
  } catch (e) {
    return cb(e);
  }
};

var compileFile = exports.compileFile = fileSystem.compileFile(compileChunk);

var compileAllFiles = exports.compileAllFiles = fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);
Object.defineProperty(exports, "__esModule", {
  value: true
});