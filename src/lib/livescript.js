'use strict';

const liveScript = require('LiveScript');

const fileSystem = require('./fileSystem');
const logging = require('./logging');

export const sourceExtension = 'ls';
export const targetExtension = 'js';

export const sourceFilePathMatches = function(options, sourceFilePath) {
  return sourceFilePath.match(new RegExp(`^${options.sourcePath}.+\.${sourceExtension}$`));
};

export const compileChunk = function(options, chunk, cb) {
  try {
    cb(null, liveScript.compile(chunk, {
      bare: true
    }));
  } catch (e) {
    return cb(e);
  }
};

export const compileFile = fileSystem.compileFile(compileChunk);

export const compileAllFiles = fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);
