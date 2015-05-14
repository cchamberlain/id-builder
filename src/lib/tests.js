'use strict';

import { exists } from 'fs';
import { resolve } from 'path';
import { spawn } from 'child_process';

import logging from './logging';

const pathToMocha = resolve(__dirname + '/../../node_modules/mocha/bin/_mocha');

const randomString = function() {
  return Math.random().toString(36).slice(7);
};

const sourceFilePathMatches = function(options, sourceFilePath) {
  const matchesJavascript = sourceFilePath && !!sourceFilePath.match(/\.js$/);
  const matchesWatchPath = sourceFilePath.indexOf(options.watchDirectoryPath) === 0;

  return matchesJavascript && matchesWatchPath;
};

const buildFilePathMatches = function(options, buildFilePath) {
  const matchesJavascript = buildFilePath && !!buildFilePath.match(/\.js$/);
  const matchesWatchPath = buildFilePath.indexOf(options.watchDirectoryPath) === 0;

  return matchesJavascript && matchesWatchPath;
};

const runTests = function(options, cb) {
  exists(options.sourceDirectoryPath, exists => {
    if (!exists) {
      logging.taskInfo(options.taskName, 'Skipping: Directory `' + options.sourceDirectoryPath + '` not found.');
      return cb();
    }

    const childProcess = spawn('node', [
      pathToMocha,
      '--recursive',
      '--colors',
      '--reporter',
      options.reporter,
      options.sourceDirectoryPath
    ]);

    childProcess.stdout.on('data', chunk => {
      return process.stdout.write(chunk);
    });

    childProcess.stderr.on('data', chunk => {
      return process.stderr.write(chunk);
    });

    childProcess.once('close', () => {
      cb();
    });
  });
};

export default {
  randomString,
  sourceFilePathMatches,
  buildFilePathMatches,
  runTests
};
