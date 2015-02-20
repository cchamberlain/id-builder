'use strict';

import { render } from 'less';

import * as fileSystem from './fileSystem';

export const sourceExtension = 'less';
export const targetExtension = 'css';

export const sourceFilePathMatches = function(options, sourceFilePath) {
  const regex = new RegExp(`^${options.sourcePath}.+\.${sourceExtension}$`);

  return sourceFilePath.match(regex);
};

export const compileChunk = function(options, chunk, cb) {
  less.render(chunk, function(e, result) {
    if (e) {
      return cb(e);
    }

    const css = result.css;

    return cb(null, css);
  });
};

export const compileFile = fileSystem.compileFile(compileChunk);

export const compileAllFiles = fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);
