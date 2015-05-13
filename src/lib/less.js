'use strict';

import less from 'less';

import log from './log';
import fileSystem from './fileSystem';

const sourceExtension = 'less';
const targetExtension = 'css';

const sourceFilePathMatches = function(options, sourceFilePath) {
  return !!sourceFilePath.match(new RegExp(`^${options.sourceDirectoryPath}.+\\.${sourceExtension}$`))
};

const compileChunk = function(options, chunk, cb) {
  const renderOptions = {
    filename: options.sourceFilePath
  };

  less.render(chunk, renderOptions, (e, result) => {
    if (e) {
      return cb(e);
    }

    return cb(null, result.css);
  });
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
