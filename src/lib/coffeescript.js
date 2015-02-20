'use strict';

const coffeeScript = require('coffee-script');

const fileSystem = require('./fileSystem');
const logging = require('./logging');

export const sourceExtension = 'coffee';
export const targetExtension = 'js';

export const sourceFilePathMatches = function(options, sourceFilePath) {
  return sourceFilePath.match(new RegExp(`^${options.sourcePath}.+\.${sourceExtension}$`));
};

export const compileChunk = function(options, chunk, cb) {
  try {
    cb(null, coffeeScript.compile(chunk, {
      bare: true
    }));
  } catch (e) {
    return cb(e);
  }
};

export const compileFile = fileSystem.compileFile(compileChunk);

export const compileAllFiles = fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);
