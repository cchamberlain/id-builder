"use strict";

const stylus = require("stylus");
const async = require("async");
const fileSystem = require("./fileSystem");
const logging = require("./logging");

const sourceExtension = "styl";
const targetExtension = "css";

const sourceFilePathMatches = function(options, sourceFilePath){
  return sourceFilePath.match(RegExp(`^${options.sourcePath}.+\.${sourceExtension}$`));
};

const compileChunk = function(options, chunk, cb){
  stylus.render(chunk, cb);
};

const compileFile = fileSystem.compileFile(compileChunk);

const compileAllFiles = fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);

module.exports = {
  sourceExtension: sourceExtension,
  targetExtension: targetExtension,
  sourceFilePathMatches: sourceFilePathMatches,
  compileChunk: compileChunk,
  compileFile: compileFile,
  compileAllFiles: compileAllFiles
};