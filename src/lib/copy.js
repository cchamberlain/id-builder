'use strict';

import fs from 'fs';

import _ from 'lodash';
import async from 'async';
import lsr from 'lsr';

import babel from './babel';
import browserify from './browserify';
import coffeescript from './coffeescript';
import fileSystem from './fileSystem';
import less from './less';
import livescript from './livescript';
import log from './log';
import stylus from './stylus';

const sourceFilePathMatches = function(options, sourceFilePath) {
  const globalOptions = global.options;

  let result;

  if (browserify.sourceFilePathMatches(globalOptions.tasks.compileBrowserify, sourceFilePath)) {
    result = false;
  } else if (coffeescript.sourceFilePathMatches(globalOptions.tasks.compileCoffeescript, sourceFilePath)) {
    result = false;
  } else if (less.sourceFilePathMatches(globalOptions.tasks.compileLess, sourceFilePath)) {
    result = false;
  } else if (livescript.sourceFilePathMatches(globalOptions.tasks.compileLivescript, sourceFilePath)) {
    result = false;
  } else if (babel.sourceFilePathMatches(globalOptions.tasks.compileBabel, sourceFilePath)) {
    result = false;
  } else if (stylus.sourceFilePathMatches(globalOptions.tasks.compileStylus, sourceFilePath)) {
    result = false;
  } else if (sourceFilePath && !!sourceFilePath.match(new RegExp(`^${options.sourceDirectoryPath}`))) {
    result = true;
  } else {
    result = false;
  }

  return result;
};

const copyFile = function(options, sourceFilePath, targetFilePath, cb) {
  fs.readFile(sourceFilePath, (e, readChunk) => {
    if (e) { return cb(e); }

    fileSystem.ensureFileDirectory(targetFilePath, e => {
      if (e) { return cb(e); }

      fs.writeFile(targetFilePath, readChunk, e => {
        if (e) { return cb(e); }

        log.taskInfo(options.taskName, `${sourceFilePath} => ${targetFilePath}`);

        cb(null);
      });
    });
  });
};

const copyAllFiles = function(options, cb) {
  lsr(options.sourceDirectoryPath, (e, nodes) => {
    if (e) {
      return cb(e);
    }

    const paths = _(nodes)
      .filter(v => { return !v.isDirectory() && sourceFilePathMatches(options, v.fullPath); })
      .map(v => { return v.fullPath; })
      .value();

    const iteratePath = (currentSourceDirectoryPath, cb) => {
      const currentTargetDirectoryPath = currentSourceDirectoryPath.replace(options.sourceDirectoryPath, options.targetDirectoryPath);

      copyFile(options, currentSourceDirectoryPath, currentTargetDirectoryPath, cb);
    };

    async.each(paths, iteratePath, e => {
      if (e) {
        return cb(e);
      }

      cb(null);
    });
  });
};

export default {
  sourceFilePathMatches,
  copyFile,
  copyAllFiles
};
