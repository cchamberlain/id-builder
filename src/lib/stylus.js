"use strict";

let stylus = require("stylus");
let async = require("async");
let fileSystem = require("./fileSystem");
let logging = require("./logging");

let sourceExtension = "styl";
let targetExtension = "css";

let sourceFilePathMatches = function(options, sourceFilePath){
  return sourceFilePath.match(RegExp(`^${options.sourcePath}.+\.${sourceExtension}$`));
};

let compileChunk = function(options, chunk, cb){
  stylus.render(chunk, cb);
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