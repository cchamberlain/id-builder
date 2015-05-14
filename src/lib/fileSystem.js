'use strict';

import fs from 'fs';
import path from 'path';

import _ from 'lodash';
import lsr from 'lsr';
import mkdirp from 'mkdirp';
import rimraf from 'rimraf';
import async from 'async';

import logging from './logging';

const removePath = rimraf;

const getFiles = function(path, cb) {
  lsr(path, (e, nodes) => {
    if (e) { return cb(e); }

    cb(null, _(nodes).filter(v => {
      return v.isFile();
    }));
  });
};

const getDirectories = function(path, cb) {
  lsr(path, (e, nodes) => {
    if (e) { return cb(e); }

    cb(null, _(nodes).filter(v => {
      return v.isDirectory();
    }));
  });
};

const getTargetPath = function(sourceDirectoryPath, targetDirectoryPath, sourceExtension, targetExtension, sourceFilePath) {
  return sourceFilePath
    .replace(sourceDirectoryPath, targetDirectoryPath)
    .replace(new RegExp('\\.' + sourceExtension + '$'), '.' + targetExtension);
};

const ensureFileDirectory = function(targetFilePath, cb) {
  mkdirp(path.dirname(targetFilePath), cb);
};

const compileFile = function(compileChunk) {
  return (options, sourceFilePath, targetFilePath, cb) => {
    fs.readFile(sourceFilePath, (e, fileContent) => {
      if (e) { return cb(e); }

      compileChunk(options, fileContent.toString(), (e, compiledChunk) => {
        if (e) { return cb(e); }

        ensureFileDirectory(targetFilePath, e => {
          if (e) { return cb(e); }

          fs.writeFile(targetFilePath, compiledChunk, e => {
            if (e) { return cb(e); }

            logging.taskInfo(options.taskName, `${sourceFilePath} => ${targetFilePath}`);

            cb(null);
          });
        });
      });
    });
  };
};

const compileAllFiles = function(sourceFilePathMatches, compileFile, sourceExtension, targetExtension) {
  return (options, cb) => {
    getFiles(options.sourceDirectoryPath, (e, sourceFilePaths) => {
      if (e) { return cb(); }

      const paths = _(sourceFilePaths)
        .map(v => { return v.fullPath; })
        .filter(v => { return sourceFilePathMatches(options, v); })
        .value();

      const iteratePath = (currentSourceFilePath, cb) => {
        const currentTargetFilePath = getTargetPath(options.sourceDirectoryPath, options.targetDirectoryPath, sourceExtension, targetExtension, currentSourceFilePath);

        compileFile(options, currentSourceFilePath, currentTargetFilePath, cb);
      };

      async.each(paths, iteratePath, cb);
    });
  };
};

export default {
  compileAllFiles: compileAllFiles,
  compileFile: compileFile,
  ensureFileDirectory: ensureFileDirectory,
  removePath: removePath
};
