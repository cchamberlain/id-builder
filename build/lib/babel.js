"use strict";

var path = require("path");

var _ = require("lodash");
var babel = require("babel");

var fileSystem = require("./fileSystem");
var logging = require("./logging");

var sourceExtension = exports.sourceExtension = "js";
var targetExtension = exports.targetExtension = "js";

var sourceFilePathMatches = exports.sourceFilePathMatches = function (options, sourceFilePath) {
  return sourceFilePath.match(new RegExp("^" + options.sourcePath + ".+." + sourceExtension + "$"));
};

var compileChunk = exports.compileChunk = function (options, chunk, cb) {
  var babelOptions = {};

  try {
    var output = babel.transform(chunk, babelOptions);

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

// filename:
// filenameRelative:
// blacklist:
// whitelist:
// loose:
// optional:
// modules:
// sourceMap:
// sourceMapName:
// sourceFileName:
// sourceRoot:
// moduleRoot:
// moduleIds:
// comments:
// keepModuleIdExtensions:
// runtime:
// code:
// ast:
// format: {
//   parenteses:
//   comments:
//   compact:
//   indent: {
//     adjustMultilineComment:
//     style:
//     base:
//   }
// }
// playground:
// experimental: