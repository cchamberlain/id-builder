import fs from 'fs';
import path from 'path';

import _ from 'lodash';
import async from 'async';
import log from 'loglevel';
import lsr from 'lsr';
import mkdirp from 'mkdirp';
import rimraf from 'rimraf';

import logging from './logging';

const removePath = rimraf;

function getFiles(path, cb)  {
  lsr(path, (e, nodes) => {
    if (e) { return cb(e); }

    cb(null, _(nodes).filter(v => {
      return v.isFile();
    }));
  });
}

function getDirectories(path, cb)  {
  lsr(path, (e, nodes) => {
    if (e) { return cb(e); }

    cb(null, _(nodes).filter(v => {
      return v.isDirectory();
    }));
  });
}

function getTargetPath(sourceDirectoryPath, targetDirectoryPath, sourceExtension, targetExtension, sourceFilePath)  {
  return sourceFilePath
    .replace(sourceDirectoryPath, targetDirectoryPath)
    .replace(new RegExp('\\.' + sourceExtension + '$'), '.' + targetExtension);
}

function ensureFileDirectory(targetFilePath, cb)  {
  mkdirp(path.dirname(targetFilePath), cb);
}

function compileFile(compileChunk, options, sourceFilePath, targetFilePath, cb)  {
  log.debug('lib/fileSystem.compileFile', sourceFilePath);

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
}

function compileAllFiles(sourceFilePathMatches, compileFile, sourceExtension, targetExtension, options, cb)  {
  log.debug('lib/fileSystem.compileAllFiles');

  getFiles(options.sourceDirectoryPath, (e, sourceFilePaths) => {
    if (e) { return cb(); }

    const paths = _(sourceFilePaths)
      .map(v => { return v.fullPath; })
      .filter(v => { return sourceFilePathMatches(options, v); })
      .value();

    const iteratePath = (currentSourceFilePath, cb) => {
      const currentTargetFilePath = getTargetPath(options.sourceDirectoryPath, options.targetDirectoryPath, sourceExtension, targetExtension, currentSourceFilePath);

      compileFile(options, currentSourceFilePath, currentTargetFilePath, cb);
    }

    async.each(paths, iteratePath, cb);
  });
}

export default {
  compileAllFiles: compileAllFiles,
  compileFile: compileFile,
  ensureFileDirectory: ensureFileDirectory,
  removePath: removePath
};
