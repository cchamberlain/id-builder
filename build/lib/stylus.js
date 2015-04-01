"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
"use strict";

var render = require("stylus").render;

var log = _interopRequireWildcard(require("./log"));

var fileSystem = _interopRequireWildcard(require("./fileSystem"));

var sourceExtension = "styl";
exports.sourceExtension = sourceExtension;
var targetExtension = "css";

exports.targetExtension = targetExtension;
var sourceFilePathMatches = function sourceFilePathMatches(options, sourceFilePath) {
  var result = !!sourceFilePath.match(RegExp("^" + options.sourcePath + ".+." + sourceExtension + "$"));

  log.debug("stylus.sourceFilePathMatches =>", result, sourceFilePath);

  return result;
};

exports.sourceFilePathMatches = sourceFilePathMatches;
var compileChunk = function compileChunk(options, chunk, cb) {
  log.debug("stylus.compileChunk", options.sourcePath);

  render(chunk, cb);
};

exports.compileChunk = compileChunk;
var compileFile = fileSystem.compileFile(compileChunk);

exports.compileFile = compileFile;
var compileAllFiles = fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);
exports.compileAllFiles = compileAllFiles;