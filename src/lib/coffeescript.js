'use strict';

const coffeeScript = require('coffee-script');

const fileSystem = require('./fileSystem');
const logging = require('./logging');

const sourceExtension = 'coffee';
const targetExtension = 'js';

const sourceFilePathMatches = function(options, sourceFilePath) {
  return sourceFilePath.match(new RegExp(`^${options.sourcePath}.+\.${sourceExtension}$`));
};

const compileChunk = function(options, chunk, cb) {
  try {
    cb(null, coffeeScript.compile(chunk, {
      bare: true
    }));
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
