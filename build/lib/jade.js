"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
"use strict";

var compileClient = require("jade").compileClient;

var log = _interopRequireWildcard(require("./log"));

var fileSystem = _interopRequireWildcard(require("./fileSystem"));

var sourceExtension = "jade";
exports.sourceExtension = sourceExtension;
var targetExtension = "js";

exports.targetExtension = targetExtension;
var sourceFilePathMatches = function sourceFilePathMatches(options, sourceFilePath) {
  var result = !!sourceFilePath.match(new RegExp("^" + options.sourcePath + ".+." + sourceExtension + "$"));

  log.debug("jade.sourceFilePathMatches =>", result, sourceFilePath);

  return result;
};

exports.sourceFilePathMatches = sourceFilePathMatches;
var compileChunk = function compileChunk(options, chunk, cb) {
  log.debug("jade.compileChunk", options.sourceFilePath);

  try {
    cb(null, compileClient(chunk, {
      compileDebug: false,
      filename: options.sourceFilePath
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