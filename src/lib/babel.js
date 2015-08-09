import log from 'loglevel';
import { transform } from 'babel';

// import logging from './logging';
import fileSystem from './fileSystem';

const sourceExtension = 'js';
const targetExtension = 'js';

function sourceFilePathMatches(options, sourceFilePath)  {
  return !!sourceFilePath.match(new RegExp(`^${options.sourceDirectoryPath}.+\\.${sourceExtension}$`));
}

function compileChunk(options, chunk, cb)  {
  log.debug('lib/babel.compileChunk');

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
}

function compileFile(options, sourceFilePath, targetFilePath, cb)  {
  log.debug('lib/babel.compileFile', sourceFilePath);

  fileSystem.compileFile(compileChunk, options, sourceFilePath, targetFilePath, cb);
}

function compileAllFiles(options, cb)  {
  log.debug('lib/babel.compileAllFiles');

  fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension, options, cb);
}

export default {
  sourceExtension,
  targetExtension,
  sourceFilePathMatches,
  compileChunk,
  compileFile,
  compileAllFiles
};
