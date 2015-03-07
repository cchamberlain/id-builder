"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var transform = require("babel").transform;
var log = _interopRequireWildcard(require("./log"));

var fileSystem = _interopRequireWildcard(require("./fileSystem"));

var sourceExtension = exports.sourceExtension = "js";
var targetExtension = exports.targetExtension = "js";

var sourceFilePathMatches = exports.sourceFilePathMatches = function (options, sourceFilePath) {
  var result = !!sourceFilePath.match(new RegExp("^" + options.sourcePath + ".+." + sourceExtension + "$"));

  log.debug("babel.sourceFilePathMatches =>", result, sourceFilePath);

  return result;
};

var compileChunk = exports.compileChunk = function (options, chunk, cb) {
  log.debug("babel.compileChunk");

  try {
    var output = transform(chunk);

    cb(null, output.code);
  } catch (e) {
    return cb(e);
  }
};

var compileFile = exports.compileFile = fileSystem.compileFile(compileChunk);

var compileAllFiles = exports.compileAllFiles = fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);
Object.defineProperty(exports, "__esModule", {
  value: true
});