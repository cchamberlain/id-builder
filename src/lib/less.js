'use strict';

import less from 'less';

import * as log from './log';
import * as fileSystem from './fileSystem';

export const sourceExtension = 'less';
export const targetExtension = 'css';

export const sourceFilePathMatches = function(options, sourceFilePath) {
  const result = !!sourceFilePath.match(new RegExp(`^${options.sourceDirectory}.+\.${sourceExtension}$`))

  log.debug('less.sourceFilePathMatches =>', result, sourceFilePath);

  return result;
};

export const compileChunk = function(options, chunk, cb) {
  log.debug('less.compileChunk', options.sourcePath);

  const renderOptions = {
    filename: options.sourcePath
  };

  less.render(chunk, renderOptions, function(e, result) {
    if (e) {
      return cb(e);
    }

    return cb(null, result.css);
  });
};

export const compileFile = fileSystem.compileFile(compileChunk);

export const compileAllFiles = fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);
