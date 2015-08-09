import log from 'loglevel';
import { render } from 'stylus';

import fileSystem from './fileSystem';

const sourceExtension = 'styl';
const targetExtension = 'css';

function sourceFilePathMatches(options, sourceFilePath) {
  return !!sourceFilePath.match(new RegExp(`^${options.sourceDirectoryPath}.+\\.${sourceExtension}$`));
}

function compileChunk(options, chunk, cb) {
  log.debug('lib/stylus.compileChunk');

  render(chunk, cb);
}

function compileFile(options, sourceFilePath, targetFilePath, cb) {
  log.debug('lib/stylus.compileFile', sourceFilePath);

  fileSystem.compileFile(compileChunk, options, sourceFilePath, targetFilePath, cb);
}

function compileAllFiles(options, cb) {
  log.debug('lib/stylus.compileAllFiles');

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
