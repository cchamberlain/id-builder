"use strict";

const less = require("less");
const async = require("async");

const fileSystem = require("./fileSystem");
const logging = require("./logging");

const sourceExtension = "less";
const targetExtension = "css";

const sourceFilePathMatches = function(options, sourceFilePath) {
  const regex = new RegExp(`^${options.sourcePath}.+\.${options.sourceExtension}$`);

  return sourceFilePath.match(regex);
};

const compileChunk = function(options, chunk, cb) {
  less.render(chunk, function(e, result) {
    if (e) {
      return cb(e);
    }

    const css = result.css;

    return cb(null, css);
  });
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