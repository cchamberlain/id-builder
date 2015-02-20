'use strict';

const path = require('path');

const _ = require('lodash')
const babel = require('babel');

const fileSystem = require('./fileSystem');
const logging = require('./logging');

export const sourceExtension = 'js';
export const targetExtension = 'js';

export const sourceFilePathMatches = function(options, sourceFilePath) {
  return sourceFilePath.match(new RegExp(`^${options.sourcePath}.+\.${sourceExtension}$`));
};

export const compileChunk = function(options, chunk, cb) {
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

export const compileFile = fileSystem.compileFile(compileChunk);

export const compileAllFiles = fileSystem.compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension);
