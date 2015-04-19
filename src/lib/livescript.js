'use strict';

import { compile } from 'LiveScript';

import log from './log';
import fileSystem from './fileSystem';

const sourceExtension = 'ls';
const targetExtension = 'js';

const sourceFilePathMatches = function(options, sourceFilePath) {
  const result = !!sourceFilePath.match(new RegExp(`^${options.sourcePath}.+\.${sourceExtension}$`))

  return result;
};

const compileChunk = function(options, chunk, cb) {
  log.debug('livescript.compileChunk', options.sourcePath);

  try {
    cb(null, compile(chunk, {
      bare: true
    }));
  } catch (e) {
    return cb(e);
  }
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
