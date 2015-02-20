'use strict';

const stylus = require('stylus');
const async = require('async');
const fileSystem = require('./fileSystem');
const logging = require('./logging');

export const sourceExtension = 'styl';
export const targetExtension = 'css';

export const sourceFilePathMatches = function(options, sourceFilePath){
  return sourceFilePath.match(RegExp(`^${options.sourcePath}.+\.${sourceExtension}$`));
};

export const compileChunk = function(options, chunk, cb){
  stylus.render(chunk, cb);
};

export const compileFile = fileSystem.compileFile(compileChunk);

export const compileAllFiles = fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);
