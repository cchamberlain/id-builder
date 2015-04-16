'use strict';

import { readFile, writeFile } from 'fs';
import { dirname } from 'path';

import _ from 'lodash';
import lsr from 'lsr';
import mkdirp from 'mkdirp';
import rimraf from 'rimraf';
import { each } from 'async';

import log from './log';

const removePath = (path, cb) => {
  rimraf(path, cb);
};

const getFiles = (path, cb) => {
  log.debug('fileSystem.getFiles', path);

  lsr(path, (e, nodes) => {
    if (e) {
      return cb(e);
    }

    cb(null, _(nodes).filter(v => {
      return v.isFile();
    }));
  });
};

const getDirectories = (path, cb) => {
  log.debug('fileSystem.getDirectories', path);

  lsr(path, (e, nodes) => {
    if (e) {
      return cb(e);
    }

    cb(null, _(nodes).filter(v => {
      return v.isDirectory();
    }));
  });
};

const getTargetPath = (sourceDirectory, targetDirectory, sourceExtension, targetExtension, sourcePath) => {
  return sourcePath
    .replace(sourceDirectory, targetDirectory)
    .replace(RegExp('\\.' + sourceExtension + '$'), '.' + targetExtension);
};

const ensureFileDirectory = (targetFilePath, cb) => {
  log.debug('fileSystem.ensureFileDirectory', targetFilePath);

  mkdirp(dirname(targetFilePath), cb);
};

const compileFile = (compileChunk) => {
  return (options, sourceFilePath, targetFilePath, cb) => {
    log.debug('fileSystem.compileFile', sourceFilePath);

    readFile(sourceFilePath, (e, fileContent) => {
      if (e) {
        return cb(e);
      }

      compileChunk(options, fileContent.toString(), (e, compiledChunk) => {
        if (e) {
          return cb(e);
        }

        ensureFileDirectory(targetFilePath, (e) => {
          if (e) {
            return cb(e);
          }

          writeFile(targetFilePath, compiledChunk, (e) => {
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

const compileAllFiles = (sourceFilePathMatches, compileFile, sourceExtension, targetExtension) => {
  return (options, cb) => {
    log.debug('fileSystem.compileAllFiles');

    getFiles(options.sourcePath, (e, sourceFilePaths) => {
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

      const iteratePath = (currentSourceFilePath, cb) => {
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
