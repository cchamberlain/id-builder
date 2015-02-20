"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var stylus = require("stylus");
var async = require("async");
var fileSystem = _interopRequireWildcard(require("./fileSystem"));

var sourceExtension = exports.sourceExtension = "styl";
var targetExtension = exports.targetExtension = "css";

var sourceFilePathMatches = exports.sourceFilePathMatches = function (options, sourceFilePath) {
  return sourceFilePath.match(RegExp("^" + options.sourcePath + ".+." + sourceExtension + "$"));
};

var compileChunk = exports.compileChunk = function (options, chunk, cb) {
  stylus.render(chunk, cb);
};

var compileFile = exports.compileFile = fileSystem.compileFile(compileChunk);

var compileAllFiles = exports.compileAllFiles = fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);
Object.defineProperty(exports, "__esModule", {
  value: true
});