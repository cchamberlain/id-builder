'use strict';

import { render } from 'stylus';
import * as fileSystem from './fileSystem';

export const sourceExtension = 'styl';
export const targetExtension = 'css';

export const sourceFilePathMatches = function(options, sourceFilePath){
  return sourceFilePath.match(RegExp(`^${options.sourcePath}.+\.${sourceExtension}$`));
};

export const compileChunk = function(options, chunk, cb){
  render(chunk, cb);
};

export const compileFile = fileSystem.compileFile(compileChunk);

export const compileAllFiles = fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);
