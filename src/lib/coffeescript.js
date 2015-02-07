"use strict";

var coffeeScript = require("coffee-script");

var fileSystem = require("./fileSystem");
var logging = require("./logging");

var sourceExtension = "coffee";
var targetExtension = "js";

var sourceFilePathMatches = function(options, sourceFilePath) {
  return sourceFilePath.match(new RegExp(`^${options.sourcePath}.+\.${options.sourceExtension}$`));
};

var compileChunk = function(options, chunk, cb) {
  try {
    cb(null, coffeeScript.compile(chunk, {
      bare: true
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