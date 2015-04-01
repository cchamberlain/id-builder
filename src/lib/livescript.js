'use strict';

import { compile } from 'LiveScript';

import * as log from './log';
import * as fileSystem from './fileSystem';

export const sourceExtension = 'ls';
export const targetExtension = 'js';

export const sourceFilePathMatches = function(options, sourceFilePath) {
  const result = !!sourceFilePath.match(new RegExp(`^${options.sourcePath}.+\.${sourceExtension}$`))

  log.debug('livescript.sourceFilePathMatches =>', result, sourceFilePath);

  return result;
};

export const compileChunk = function(options, chunk, cb) {
  log.debug('livescript.compileChunk', options.sourcePath);

  try {
    cb(null, compile(chunk, {
      bare: true
    }));
  } catch (e) {
    return cb(e);
  }
};

export const compileFile = fileSystem.compileFile(compileChunk);

export const compileAllFiles = fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);