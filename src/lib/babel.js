'use strict';

import { transform } from 'babel';

import log from './log';
import fileSystem from './fileSystem'

const sourceExtension = 'js';
const targetExtension = 'js';

const sourceFilePathMatches = (options, sourceFilePath) => {
  const result = !!sourceFilePath.match(new RegExp(`^${options.sourcePath}.+\.${sourceExtension}$`));

  return result;
};

const compileChunk = (options, chunk, cb) => {
  try {
    const output = transform(chunk);

    cb(null, output.code);
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
