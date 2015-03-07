'use strict';

import { compile } from 'coffee-script';

import * as log from './log';
import * as fileSystem from './fileSystem';

export const sourceExtension = 'coffee';
export const targetExtension = 'js';

export const sourceFilePathMatches = function(options, sourceFilePath) {
  const result = !!sourceFilePath.match(RegExp(`^${options.sourcePath}.+\.${sourceExtension}}`))

  log.debug('coffeescript.sourceFilePathMatches =>', result, sourceFilePath);

  return result;
};

export const compileChunk = function(options, chunk, cb) {
  log.debug('coffeescript.compileChunk', options);

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
