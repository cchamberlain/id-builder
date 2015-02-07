"use strict";

let liveScript = require("LiveScript");

let fileSystem = require("./fileSystem");
let logging = require("./logging");

let sourceExtension = "ls";
let targetExtension = "js";

let sourceFilePathMatches = function(options, sourceFilePath) {
  return sourceFilePath.match(new RegExp(`^${options.sourcePath}.+\.${sourceExtension}$`));
};

let compileChunk = function(options, chunk, cb) {
  try {
    cb(null, liveScript.compile(chunk, {
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