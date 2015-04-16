'use strict';

import { compile } from 'coffee-script';

import log from './log';
import fileSystem from './fileSystem';

const sourceExtension = 'coffee';
const targetExtension = 'js';

const sourceFilePathMatches = (options, sourceFilePath) => {
  const result = !!sourceFilePath.match(new RegExp(`^${options.sourcePath}.+\.${sourceExtension}`))

  return result;
};

const compileChunk = (options, chunk, cb) => {
  log.debug('coffeescript.compileChunk', options);

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
