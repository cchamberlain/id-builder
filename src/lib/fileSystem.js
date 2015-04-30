'use strict';

import fs from 'fs';
import path from 'path';

import _ from 'lodash';
import lsr from 'lsr';
import mkdirp from 'mkdirp';
import rimraf from 'rimraf';
import async from 'async';

import log from './log';

const removePath = rimraf;

const getFiles = function(path, cb) {
  log.debug('fileSystem.getFiles', path);

  lsr(path, (e, nodes) => {
    if (e) { return cb(e); }

    cb(null, _(nodes).filter(v => {
      return v.isFile();
    }));
  });
};

const getDirectories = function(path, cb) {
  log.debug('fileSystem.getDirectories', path);

  lsr(path, (e, nodes) => {
    if (e) { return cb(e); }

    cb(null, _(nodes).filter(v => {
      return v.isDirectory();
    }));
  });
};

const getTargetPath = function(sourceDirectory, targetDirectory, sourceExtension, targetExtension, sourcePath) {
  return sourcePath
    .replace(sourceDirectory, targetDirectory)
    .replace(new RegExp('\\.' + sourceExtension + '$'), '.' + targetExtension);
};

const ensureFileDirectory = function(targetFilePath, cb) {
  log.debug('fileSystem.ensureFileDirectory', targetFilePath);

  mkdirp(path.dirname(targetFilePath), cb);
};

const compileFile = function(compileChunk) {
  return (options, sourceFilePath, targetFilePath, cb) => {
    log.debug('fileSystem.compileFile', sourceFilePath);

    fs.readFile(sourceFilePath, (e, fileContent) => {
      if (e) { return cb(e); }

      compileChunk(options, fileContent.toString(), (e, compiledChunk) => {
        if (e) { return cb(e); }

        ensureFileDirectory(targetFilePath, e => {
          if (e) { return cb(e); }

          fs.writeFile(targetFilePath, compiledChunk, e => {
            if (e) { return cb(e); }

            log.taskInfo(options.taskName, `${sourceFilePath} => ${targetFilePath}`);

            cb(null);
          });
        });
      });
    });
  };
};

const compileAllFiles = function(sourceFilePathMatches, compileFile, sourceExtension, targetExtension) {
  return (options, cb) => {
    log.debug('fileSystem.compileAllFiles');

    getFiles(options.sourcePath, (e, sourceFilePaths) => {
      if (e) { return cb(); }

      const paths = _(sourceFilePaths)
        .map(v => { return v.fullPath; })
        .filter(v => { return sourceFilePathMatches(options, v); })
        .value();

      const iteratePath = (currentSourceFilePath, cb) => {
        const currentTargetFilePath = getTargetPath(options.sourcePath, options.targetPath, sourceExtension, targetExtension, currentSourceFilePath);

        compileFile(options, currentSourceFilePath, currentTargetFilePath, cb);
      };

      async.each(paths, iteratePath, cb);
    });
  };
};

export default {
  compileAllFiles,
  compileFile,
  ensureFileDirectory,
  removePath
};
