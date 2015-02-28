'use strict';

import _ from 'lodash';
import { resolve } from 'path';
import less from 'less';

import * as fileSystem from './fileSystem';

export const sourceExtension = 'less';
export const targetExtension = 'css';

export const sourceFilePathMatches = function(options, sourceFilePath) {
  const regex = new RegExp(`^${options.sourceDirectory}.+\.${sourceExtension}$`);

  return sourceFilePath.match(regex);
};

export const compileChunk = function(options, chunk, cb) {
  const parseOptions = {
    filename: options.sourcePath
  };

  less.render(chunk, parseOptions, function(e, result) {
    if (e) {
      return cb(e);
    }

    return cb(null, result.css);
  });
};

export const compileFile = fileSystem.compileFile(compileChunk);

export const compileAllFiles = fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);
