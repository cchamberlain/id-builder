'use strict';

import { transform } from 'babel';

import * as log from './log';
import * as fileSystem from './fileSystem'

export const sourceExtension = 'js';
export const targetExtension = 'js';

export const sourceFilePathMatches = function(options, sourceFilePath) {
  const result = !!sourceFilePath.match(new RegExp(`^${options.sourcePath}.+\.${sourceExtension}$`));

  log.debug('babel.sourceFilePathMatches =>', result, sourceFilePath);

  return result;
};

export const compileChunk = function(options, chunk, cb) {
  log.debug('babel.compileChunk');

  try {
    const output = transform(chunk);

    cb(null, output.code);
  } catch (e) {
    return cb(e);
  }
};

export const compileFile = fileSystem.compileFile(compileChunk);

export const compileAllFiles = fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);
