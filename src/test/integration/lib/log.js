'use strict';

import fs from 'fs';

import log from 'loglevel';
import mkdirp from 'mkdirp';
import rimraf from 'rimraf';
import { expect } from 'chai';

import fileSystem from '../build/../../../lib/fileSystem';
import { randomString } from '../build/../../../lib/tests';

const functionSource = `const x = y => y * 2`;

describe('fileSystem', function() {
  beforeEach(function(cb) {
    this.directoryPath = '.tmp/' + Math.random().toString(36).slice(7);

    mkdirp(this.directoryPath, cb);
  });

  afterEach(function(cb) {
    rimraf(this.directoryPath, cb);
  });

  describe('debug', function() {
  });

  describe('info', function() {
  });

  describe('warn', function() {
  });

  describe('error', function() {
  });

  describe('arrowCharacter', function() {
  });

  describe('taskInfo', function() {
  });

  describe('taskWarn', function() {
  });

  describe('taskError', function() {
  });

  describe('disabledTask', function() {
  });

  describe('startTask', function() {
  });

  describe('finishTask', function() {
  });
});
