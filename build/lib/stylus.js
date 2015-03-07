"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var render = require("stylus").render;
var log = _interopRequireWildcard(require("./log"));

var fileSystem = _interopRequireWildcard(require("./fileSystem"));

var sourceExtension = exports.sourceExtension = "styl";
var targetExtension = exports.targetExtension = "css";

var sourceFilePathMatches = exports.sourceFilePathMatches = function (options, sourceFilePath) {
  var result = !!sourceFilePath.match(RegExp("^" + options.sourcePath + ".+." + sourceExtension + "$"));

  log.debug("stylus.sourceFilePathMatches =>", result, sourceFilePath);

  return result;
};

var compileChunk = exports.compileChunk = function (options, chunk, cb) {
  log.debug("stylus.compileChunk", options.sourcePath);

  render(chunk, cb);
};

var compileFile = exports.compileFile = fileSystem.compileFile(compileChunk);

var compileAllFiles = exports.compileAllFiles = fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);
Object.defineProperty(exports, "__esModule", {
  value: true
});