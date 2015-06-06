'use strict';

import log from 'loglevel';
import { compile } from 'coffee-script';

import logging from './logging';
import fileSystem from './fileSystem';

const sourceExtension = 'coffee';
const targetExtension = 'js';

const sourceFilePathMatches = function(options, sourceFilePath) {
  return !!sourceFilePath.match(new RegExp(`^${options.sourceDirectoryPath}.+\\.${sourceExtension}$`));
};

const compileChunk = function(options, chunk, cb) {
  log.debug('lib/coffeescript.compileChunk');

  try {
    cb(null, compile(chunk, {
      bare: true
    }));
  } catch (e) {
    return cb(e);
  }
};

const compileFile = function(options, sourceFilePath, targetFilePath, cb) {
  log.debug('lib/coffeescript.compileFile', sourceFilePath);

  fileSystem.compileFile(compileChunk, options, sourceFilePath, targetFilePath, cb);
};

const compileAllFiles = function(options, cb) {
  log.debug('lib/coffeescript.compileAllFiles');

  fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension, options, cb);
};

export default {
  sourceExtension,
  targetExtension,
  sourceFilePathMatches,
  compileChunk,
  compileFile,
  compileAllFiles
};
