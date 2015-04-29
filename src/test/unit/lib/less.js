'use strict';

import log from 'loglevel';
import { expect } from 'chai';
import mkdirp from 'mkdirp';
import rimraf from 'rimraf';

import less from '../build/../../../lib/less';
import { randomString } from '../build/../../../lib/tests';

describe('less', function() {
  beforeEach(function (cb) {
    this.directoryPath = '.tmp/' + randomString();
    mkdirp(this.directoryPath, cb);
  });

  afterEach(function (cb) {
    rimraf(this.directoryPath, cb);
  });

  describe('sourceExtension', function () {
    it('should be defined', function (cb) {
      expect(less.sourceExtension).to.be.a('string')['with'].length.above(0);

      cb();
    });
  });

  describe('targetExtension', function () {
    it('should be defined', function (cb) {
      expect(less.targetExtension).to.be.a('string')['with'].length.above(0);

      cb();
    });
  });

  describe('pathReloads(options, path)', function () {
  });

  describe('sourceFilePathMatches', function () {
  });

  describe('compileChunk', function() {
  });

  describe('compileFile', function() {
  });

  describe('compileAllFiles', function() {
  });
});
