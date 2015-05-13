'use strict';

import { render } from 'stylus';

import log from './log';
import fileSystem from './fileSystem';

const sourceExtension = 'styl';
const targetExtension = 'css';

const sourceFilePathMatches = function(options, sourceFilePath){
  const result = !!sourceFilePath.match(new RegExp(`^${options.sourceDirectoryPath}.+\\.${sourceExtension}$`))

  return result;
};

const compileChunk = function(options, chunk, cb){
  log.debug('stylus.compileChunk', options.sourceDirectoryPath);

  render(chunk, cb);
};

const compileFile = fileSystem.compileFile(compileChunk);

const compileAllFiles = fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);

export default {
  sourceExtension,
  targetExtension,
  sourceFilePathMatches,
  compileChunk,
  compileFile,
  compileAllFiles
};
