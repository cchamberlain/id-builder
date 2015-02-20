'use strict';

const fs = require('fs');

const _ = require('lodash');
const mkdirp = require('mkdirp');
const async = require('async');
const lsr = require('lsr');
const prelude = require('prelude-ls');

const browserify = require('./browserify');
const coffeescript = require('./coffeescript');
const fileSystem = require('./fileSystem');
const jade = require('./jade');
const less = require('./less');
const livescript = require('./livescript');
const logging = require('./logging');
const babel = require('./babel');
const stylus = require('./stylus');

export const sourceFilePathMatches = function(options, sourceFilePath) {
  const globalOptions = global.options;

  if (browserify.sourceFilePathMatches(globalOptions.tasks.compileBrowserify, sourceFilePath)) {
    return false;
  } else if (coffeescript.sourceFilePathMatches(globalOptions.tasks.compileCoffeescript, sourceFilePath)) {
    return false;
  } else if (jade.sourceFilePathMatches(globalOptions.tasks.compileJade, sourceFilePath)) {
    return false;
  } else if (less.sourceFilePathMatches(globalOptions.tasks.compileLess, sourceFilePath)) {
    return false;
  } else if (livescript.sourceFilePathMatches(globalOptions.tasks.compileLivescript, sourceFilePath)) {
    return false;
  } else if (babel.sourceFilePathMatches(globalOptions.tasks.compileBabel, sourceFilePath)) {
    return false;
  } else if (stylus.sourceFilePathMatches(globalOptions.tasks.compileStylus, sourceFilePath)) {
    return false;
  } else if (sourceFilePath && !!sourceFilePath.match(RegExp(`^${options.sourcePath}`))) {
    return true;
  } else {
    return false;
  }
};

export const copyFile = function(options, sourceFilePath, targetFilePath, cb) {
  fs.readFile(sourceFilePath, function(e, readChunk){
    if (e) {
      return cb(e);
    }

    fileSystem.ensureFileDirectory(targetFilePath, function(e){
      if (e) {
        return cb(e);
      }

      fs.writeFile(targetFilePath, readChunk, function(e){
        if (e) {
          return cb(e);
        }

        logging.taskInfo(options.taskName, `${sourceFilePath} => ${targetFilePath}`);

        cb(null);
      });
    });
  });
};

export const copyAllFiles = function(options, cb) {
  lsr(options.sourcePath, function(e, nodes){
    if (e) {
      return cb(e);
    }

    const paths = _(nodes)
      .filter(function(v) {
        return !v.isDirectory() && sourceFilePathMatches(options, v.fullPath);
      })
      .map(function(v) {
        return v.fullPath;
      })
      .value();

    const iteratePath = function(currentSourceDirectoryPath, cb){
      const currentTargetDirectoryPath = currentSourceDirectoryPath.replace(options.sourcePath, options.targetPath);

      copyFile(options, currentSourceDirectoryPath, currentTargetDirectoryPath, cb);
    };

    async.each(paths, iteratePath, function(e){
      if (e) {
        return cb(e);
      }

      cb(null);
    });
  });
};
