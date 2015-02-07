"use strict";

let jade = require("jade");
let async = require("async");

let fileSystem = require("./fileSystem");
let logging = require("./logging");

let sourceExtension = "jade";
let targetExtension = "js";

let sourceFilePathMatches = function(options, sourceFilePath) {
  let regex = new RegExp(`^${options.sourcePath}.+\.${options.sourceExtension}$`);

  return sourceFilePath.match(regex);
};

let compileChunk = function(options, chunk, cb) {
  try {
    cb(null, jade.compileClient(chunk, {
      compileDebug: false,
      filename: options.sourceFilePath
    }))
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