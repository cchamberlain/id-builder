"use strict";

let coffeeScript = require("coffee-script");

let fileSystem = require("./fileSystem");
let logging = require("./logging");

let sourceExtension = "coffee";
let targetExtension = "js";

let sourceFilePathMatches = function(options, sourceFilePath) {
  return sourceFilePath.match(new RegExp(`^${options.sourcePath}.+\.${options.sourceExtension}$`));
};

let compileChunk = function(options, chunk, cb) {
  try {
    cb(null, coffeeScript.compile(chunk, {
      bare: true
    }));
  } catch (e) {
    return cb(e);
  }
};

let compileFile = fileSystem.compileFile(compileChunk);

let compileAllFiles = fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);

module.exports = {
  sourceExtension: sourceExtension,
  targetExtension: targetExtension,

  sourceFilePathMatches: sourceFilePathMatches,
  compileChunk: compileChunk,
  compileFile: compileFile,
  compileAllFiles: compileAllFiles
};