'use strict';

import { exists } from 'fs';
import { resolve } from 'path';
import { spawn } from 'child_process';

const pathToMocha = resolve(__dirname + '/../../node_modules/mocha/bin/_mocha');

export const randomString = function() {
  return Math.random().toString(36).slice(7);
};

export const sourceFilePathMatches = function(options, sourceFilePath) {
  const matchesJavascript = sourceFilePath && !!sourceFilePath.match(/\.js$/);
  const matchesTarget = sourceFilePath.indexOf(global.options.targetDirectory) === 0;

  console.log(global.options.targetDirectory, sourceFilePath);

  console.log('sourceFilePathMatches', matchesJavascript, matchesTarget);

  return matchesJavascript && matchesTarget;
};

export const buildFilePathMatches = function(options, buildFilePath) {
  const matchesJavascript = buildFilePath && !!buildFilePath.match(/\.js$/);
  const matchesTarget = buildFilePath.indexOf(global.options.targetDirectory) === 0;

  console.log(global.options.targetDirectory, buildFilePath);

  console.log('buildFilePathMatches', matchesJavascript, matchesTarget);

  return matchesJavascript && matchesTarget;
};

export const runTests = function(options, cb) {
  exists(options.sourcePath, function(exists) {
    if (!exists) {
      logging.taskInfo(options.taskName, 'Skipping: Directory `' + options.sourcePath + '` not found.');
      return cb();
    }

    const childProcess = spawn('iojs', [
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
