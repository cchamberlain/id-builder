'use strict';

import { exists } from 'fs';
import { resolve } from 'path';
import { spawn } from 'child_process';

import log from './log';

const pathToMocha = resolve(__dirname + '/../../node_modules/mocha/bin/_mocha');

const randomString = function() {
  return Math.random().toString(36).slice(7);
};

const sourceFilePathMatches = function(options, sourceFilePath) {
  const matchesJavascript = sourceFilePath && !!sourceFilePath.match(/\.js$/);
  const matchesWatchPath = sourceFilePath.indexOf(options.watchPath) === 0;
  const result = matchesJavascript && matchesWatchPath;

  return result;
};

const buildFilePathMatches = function(options, buildFilePath) {
  const matchesJavascript = buildFilePath && !!buildFilePath.match(/\.js$/);
  const matchesWatchPath = buildFilePath.indexOf(options.watchPath) === 0;
  const result = matchesJavascript && matchesWatchPath;

  return result;
};

const runTests = function(options, cb) {
  log.debug('tests.runTests', options.sourcePath);

  exists(options.sourcePath, function(exists) {
    if (!exists) {
      log.taskInfo(options.taskName, 'Skipping: Directory `' + options.sourcePath + '` not found.');
      return cb();
    }

    const childProcess = spawn('node', [
      pathToMocha,
      '--recursive',
      '--colors',
      '--reporter',
      options.reporter,
      options.sourcePath
    ]);

    childProcess.stdout.on('data', function(chunk) {
      return process.stdout.write(chunk);
    });

    childProcess.stderr.on('data', function(chunk) {
      return process.stderr.write(chunk);
    });

    childProcess.once('close', function() {
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
