'use strict';

import log from 'loglevel';
import { transform } from 'babel';

import logging from './logging';
import fileSystem from './fileSystem'

const sourceExtension = 'js';
const targetExtension = 'js';

const sourceFilePathMatches = function(options, sourceFilePath) {
  return !!sourceFilePath.match(new RegExp(`^${options.sourceDirectoryPath}.+\\.${sourceExtension}$`));
};

const compileChunk = function(options, chunk, cb) {
  try {
    const output = transform(chunk, {
      optional: [
        'es7.asyncFunctions',
        'es7.decorators',
        'es7.exportExtensions',
        'es7.objectRestSpread',
        'es7.trailingFunctionCommas'
      ]
    });

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
