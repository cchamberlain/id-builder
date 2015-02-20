'use strict';

import { transform } from 'babel';

import * as fileSystem from './fileSystem'

export const sourceExtension = 'js';
export const targetExtension = 'js';

export const sourceFilePathMatches = function(options, sourceFilePath) {
  return sourceFilePath.match(new RegExp(`^${options.sourcePath}.+\.${sourceExtension}$`));
};

export const compileChunk = function(options, chunk, cb) {
  try {
    const output = transform(chunk);

    cb(null, output.code);
  } catch (e) {
    return cb(e);
  }
};

export const compileFile = fileSystem.compileFile(compileChunk);

export const compileAllFiles = fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);
