import less from 'less';
import log from 'loglevel';

import fileSystem from './fileSystem';

const sourceExtension = 'less';
const targetExtension = 'css';

function sourceFilePathMatches(options, sourceFilePath) {
  return !!sourceFilePath.match(new RegExp(`^${options.sourceDirectoryPath}.+\\.${sourceExtension}$`));
}

function compileChunk(options, chunk, cb) {
  log.debug('lib/less.compileChunk');

  const renderOptions = {
    filename: options.sourceFilePath
  };

  less.render(chunk, renderOptions, (e, result) => {
    if (e) {
      return cb(e);
    }

    return cb(null, result.css);
  });
}

function compileFile(options, sourceFilePath, targetFilePath, cb) {
  log.debug('lib/less.compileFile', sourceFilePath);

  fileSystem.compileFile(compileChunk, options, sourceFilePath, targetFilePath, cb);
}

function compileAllFiles(options, cb) {
  log.debug('lib/less.compileAllFiles');

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
