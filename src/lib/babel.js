import log from 'loglevel';
import _ from 'lodash';
import { transform } from 'babel';

// import logging from './logging';
import fileSystem from './fileSystem';

const sourceExtension = 'js';
const targetExtension = 'js';

function sourceFilePathMatches(options, sourceFilePath) {
  const isIgnored = _.find(options.ignore, (v) => {
    const expression = new RegExp(v);

    return !!expression.exec(sourceFilePath);
  });

  if (isIgnored) {
    return false;
  }

  const expression = new RegExp(`^${options.sourceDirectoryPath}.+\\.${sourceExtension}$`);

  return !!sourceFilePath.match(expression);
}

function compileChunk(options, chunk, cb) {
  log.debug('lib/babel.compileChunk');

  try {
    const output = transform(chunk, options.options);

    cb(null, output.code);
  } catch (e) {
    return cb(e);
  }
}

function compileFile(options, sourceFilePath, targetFilePath, cb) {
  log.debug('lib/babel.compileFile', sourceFilePath);

  fileSystem.compileFile(compileChunk, options, sourceFilePath, targetFilePath, cb);
}

function compileAllFiles(options, cb) {
  log.debug('lib/babel.compileAllFiles');

  fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension, options, cb);
}

function compileAllPolymerComponentFiles(options, cb) {
}

export default {
  sourceExtension,
  targetExtension,
  sourceFilePathMatches,
  compileChunk,
  compileFile,
  compileAllFiles,
  compileAllPolymerComponentFiles
};
