'use strict';

import { readFile, writeFile } from 'fs';
import { dirname } from 'path';

import _ from 'lodash';
import lsr from 'lsr';
import mkdirp from 'mkdirp';
import rimraf from 'rimraf';
import { each } from 'async';

import log from './log';

const removePath = function(path, cb) {
  rimraf(path, cb);
};

const getFiles = function(path, cb) {
  log.debug('fileSystem.getFiles', path);

  lsr(path, function(e, nodes) {
    if (e) {
      return cb(e);
    }

    cb(null, _(nodes).filter(v => {
      return v.isFile();
    }));
  });
};

const getDirectories = function(path, cb) {
  log.debug('fileSystem.getDirectories', path);

  lsr(path, function(e, nodes) {
    if (e) {
      return cb(e);
    }

    cb(null, _(nodes).filter(v => {
      return v.isDirectory();
    }));
  });
};

const getTargetPath = function(sourceDirectory, targetDirectory, sourceExtension, targetExtension, sourcePath) {
  return sourcePath
    .replace(sourceDirectory, targetDirectory)
    .replace(RegExp('\\.' + sourceExtension + '$'), '.' + targetExtension);
};

const ensureFileDirectory = function(targetFilePath, cb) {
  log.debug('fileSystem.ensureFileDirectory', targetFilePath);

  mkdirp(dirname(targetFilePath), cb);
};

const compileFile = function(compileChunk) {
  return function(options, sourceFilePath, targetFilePath, cb) {
    log.debug('fileSystem.compileFile', sourceFilePath);

    readFile(sourceFilePath, function(e, fileContent) {
      if (e) {
        return cb(e);
      }

      compileChunk(options, fileContent.toString(), function(e, compiledChunk) {
        if (e) {
          return cb(e);
        }

        ensureFileDirectory(targetFilePath, function(e) {
          if (e) {
            return cb(e);
          }

          writeFile(targetFilePath, compiledChunk, function(e) {
            if (e) {
              return cb(e);
            }

            log.taskInfo(options.taskName, `${sourceFilePath} => ${targetFilePath}`);

            cb(null);
          });
        });
      });
    });
  };
};

const compileAllFiles = function(sourceFilePathMatches, compileFile, sourceExtension, targetExtension) {
  return function(options, cb) {
    log.debug('fileSystem.compileAllFiles');

    getFiles(options.sourcePath, function(e, sourceFilePaths) {
      if (e) {
        return cb();
      }

      const paths = _(sourceFilePaths)
        .map(v => {
          return v.fullPath;
        })
        .filter(v => {
          return sourceFilePathMatches(options, v);
        })
        .value();

      const iteratePath = function(currentSourceFilePath, cb) {
        const currentTargetFilePath = getTargetPath(options.sourcePath, options.targetPath, sourceExtension, targetExtension, currentSourceFilePath);

        compileFile(options, currentSourceFilePath, currentTargetFilePath, cb);
      };

      each(paths, iteratePath, cb);
    });
  };
};

export default {
  compileAllFiles,
  compileFile,
  ensureFileDirectory,
  removePath
};
