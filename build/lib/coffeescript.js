"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var compile = require("coffee-script").compile;
var fileSystem = _interopRequireWildcard(require("./fileSystem"));

var sourceExtension = exports.sourceExtension = "coffee";
var targetExtension = exports.targetExtension = "js";

var sourceFilePathMatches = exports.sourceFilePathMatches = function (options, sourceFilePath) {
  return sourceFilePath.match(new RegExp("^" + options.sourcePath + ".+." + sourceExtension + "$"));
};

var compileChunk = exports.compileChunk = function (options, chunk, cb) {
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