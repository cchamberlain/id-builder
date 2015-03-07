'use strict';

import { render } from 'stylus';

import * as log from './log';
import * as fileSystem from './fileSystem';

export const sourceExtension = 'styl';
export const targetExtension = 'css';

export const sourceFilePathMatches = function(options, sourceFilePath){
  const result = !!sourceFilePath.match(RegExp(`^${options.sourcePath}.+\.${sourceExtension}$`))

  log.debug('stylus.sourceFilePathMatches =>', result, sourceFilePath);

  return result;
};

export const compileChunk = function(options, chunk, cb){
  log.debug('stylus.compileChunk', options.sourcePath);

  render(chunk, cb);
};

export const compileFile = fileSystem.compileFile(compileChunk);

export const compileAllFiles = fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);
