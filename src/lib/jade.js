'use strict';

import { compileClient } from 'jade';

import * as log from './log';
import * as fileSystem from './fileSystem';

export const sourceExtension = 'jade';
export const targetExtension = 'js';

export const sourceFilePathMatches = function(options, sourceFilePath) {
  const result = !!sourceFilePath.match(new RegExp(`^${options.sourcePath}.+\.${sourceExtension}$`))

  log.debug('jade.sourceFilePathMatches =>', result, sourceFilePath);

  return result;
};

export const compileChunk = function(options, chunk, cb) {
  log.debug('jade.compileChunk', options.sourceFilePath);

  try {
    cb(null, ('module.exports='+compileClient(chunk, {
      compileDebug: false,
      filename: options.sourceFilePath
    })))
  } catch (e) {
    return cb(e);
  }
};

export const compileFile = fileSystem.compileFile(compileChunk);

export const compileAllFiles = fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);
