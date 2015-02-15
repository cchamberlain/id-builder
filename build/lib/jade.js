"use strict";

var jade = require("jade");
var async = require("async");

var fileSystem = require("./fileSystem");
var logging = require("./logging");

var sourceExtension = "jade";
var targetExtension = "js";

var sourceFilePathMatches = function (options, sourceFilePath) {
  var regex = new RegExp("^" + options.sourcePath + ".+." + sourceExtension + "$");

  return sourceFilePath.match(regex);
};

var compileChunk = function (options, chunk, cb) {
  try {
    cb(null, jade.compileClient(chunk, {
      compileDebug: false,
      filename: options.sourceFilePath
    }));
  } catch (e) {
    return cb(e);
  }
};

var compileFile = fileSystem.compileFile(compileChunk);

var compileAllFiles = fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);

module.exports = {
  sourceExtension: sourceExtension,
  targetExtension: targetExtension,
  sourceFilePathMatches: sourceFilePathMatches,
  compileChunk: compileChunk,
  compileFile: compileFile,
  compileAllFiles: compileAllFiles
};