"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var compileClient = require("jade").compileClient;
var log = _interopRequireWildcard(require("./log"));

var fileSystem = _interopRequireWildcard(require("./fileSystem"));

var sourceExtension = exports.sourceExtension = "jade";
var targetExtension = exports.targetExtension = "js";

var sourceFilePathMatches = exports.sourceFilePathMatches = function (options, sourceFilePath) {
  var result = !!sourceFilePath.match(new RegExp("^" + options.sourcePath + ".+." + sourceExtension + "$"));

  log.debug("jade.sourceFilePathMatches =>", result, sourceFilePath);

  return result;
};

var compileChunk = exports.compileChunk = function (options, chunk, cb) {
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

var compileFile = exports.compileFile = fileSystem.compileFile(compileChunk);

var compileAllFiles = exports.compileAllFiles = fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);
Object.defineProperty(exports, "__esModule", {
  value: true
});