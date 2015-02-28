'use strict';

import { compileClient } from 'jade';

import * as fileSystem from './fileSystem';

export const sourceExtension = 'jade';
export const targetExtension = 'js';

export const sourceFilePathMatches = function(options, sourceFilePath) {
  const regex = new RegExp(`^${options.sourcePath}.+\.${sourceExtension}$`);

  return sourceFilePath.match(regex);
};

export const compileChunk = function(options, chunk, cb) {
  try {
    cb(null, compileClient(chunk, {
      compileDebug: false,
      filename: options.sourceFilePath
    }))
  } catch (e) {
    return cb(e);
  }
};

export const compileFile = fileSystem.compileFile(compileChunk);

export const compileAllFiles = fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);
