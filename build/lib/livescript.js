"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
"use strict";

var compile = require("LiveScript").compile;

var log = _interopRequireWildcard(require("./log"));

var fileSystem = _interopRequireWildcard(require("./fileSystem"));

var sourceExtension = "ls";
exports.sourceExtension = sourceExtension;
var targetExtension = "js";

exports.targetExtension = targetExtension;
var sourceFilePathMatches = function sourceFilePathMatches(options, sourceFilePath) {
  var result = !!sourceFilePath.match(new RegExp("^" + options.sourcePath + ".+." + sourceExtension + "$"));

  log.debug("livescript.sourceFilePathMatches =>", result, sourceFilePath);

  return result;
};

exports.sourceFilePathMatches = sourceFilePathMatches;
var compileChunk = function compileChunk(options, chunk, cb) {
  log.debug("livescript.compileChunk", options.sourcePath);

  try {
    cb(null, compile(chunk, {
      bare: true
    }));
  } catch (e) {
    return cb(e);
  }
};

exports.compileChunk = compileChunk;
var compileFile = fileSystem.compileFile(compileChunk);

exports.compileFile = compileFile;
var compileAllFiles = fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);
exports.compileAllFiles = compileAllFiles;