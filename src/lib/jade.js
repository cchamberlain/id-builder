"use strict";

const jade = require("jade");
const async = require("async");

const fileSystem = require("./fileSystem");
const logging = require("./logging");

const sourceExtension = "jade";
const targetExtension = "js";

const sourceFilePathMatches = function(options, sourceFilePath) {
  const regex = new RegExp(`^${options.sourcePath}.+\.${options.sourceExtension}$`);

  return sourceFilePath.match(regex);
};

const compileChunk = function(options, chunk, cb) {
  try {
    cb(null, jade.compileClient(chunk, {
      compileDebug: false,
      filename: options.sourceFilePath
    }))
  } catch (e) {
    return cb(e);
  }
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