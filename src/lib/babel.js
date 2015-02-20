'use strict';

const path = require('path');

const _ = require('lodash')
const babel = require('6to5');

const fileSystem = require('./fileSystem');
const logging = require('./logging');

const sourceExtension = 'js';
const targetExtension = 'js';

const sourceFilePathMatches = function(options, sourceFilePath) {
  return sourceFilePath.match(new RegExp(`^${options.sourcePath}.+\.${sourceExtension}$`));
};

const compileChunk = function(options, chunk, cb) {
  const babelOptions = {
    // filename:
    // filenameRelative:
    // blacklist:
    // whitelist:
    // loose:
    // optional:
    // modules:
    // sourceMap:
    // sourceMapName:
    // sourceFileName:
    // sourceRoot:
    // moduleRoot:
    // moduleIds:
    // comments:
    // keepModuleIdExtensions:
    // runtime:
    // code:
    // ast:
    // format: {
    //   parenteses:
    //   comments:
    //   compact:
    //   indent: {
    //     adjustMultilineComment:
    //     style:
    //     base:
    //   }
    // }
    // playground:
    // experimental:
  };

  try {
    const output = babel.transform(chunk, babelOptions);

    cb(null, output.code);
  } catch (e) {
    return cb(e);
  }
};

const compileFile = fileSystem.compileFile(compileChunk);

const compileAllFiles = fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);

module.exports = {
  sourceExtension: sourceExtension,
  targetExtension: targetExtension,

  sourceFilePathMatches: sourceFilePathMatches,
  compileChunk: compileChunk,
  compileFile: compileFile,
  compileAllFiles: compileAllFiles
};
