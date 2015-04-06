'use strict';

import log from 'loglevel';
import { expect } from 'chai';
import mkdirp from 'mkdirp';
import rimraf from 'rimraf';

import browserify from '../build/../../../lib/browserify';
import { randomString } from '../build/../../../lib/tests';

describe('browserify', function() {
  beforeEach(function(cb) {
    this.directoryPath = '.tmp/' + randomString();

    mkdirp(this.directoryPath, cb);
  });

  afterEach(function(cb) {
    rimraf(this.directoryPath, cb);
  });

  describe('sourceExtension', function() {
    it('should be defined', function(cb) {
      expect(browserify.sourceExtension).to.be.a('string')['with'].length.above(0);

      cb();
    });
  });

  describe('targetExtension', function() {
    it('should be defined', function(cb) {
      expect(browserify.targetExtension).to.be.a('string')['with'].length.above(0);

      cb();
    });
  });

  describe('pathReloads(options, path)', function() {
  });

  describe('sourceFilePathMatches', function() {
    describe('when the `sourceFilePath` is the `targetPath`', function() {
      it('should return `false`', function(cb) {
        const options = {
          targetPath: 'x/y.js',
          sourceDirectory: 'x'
        };

        expect(browserify.sourceFilePathMatches(options, 'x/y.js')).to.equal(false);

        cb();
      });
    });

    describe('when the `sourceFilePath` is in the the `sourceDirectory`', function() {
      it('should return `true`', function(cb) {
        const options = {
          targetPath: 'x/y.js',
          sourceDirectory: 'x'
        };

        expect(browserify.sourceFilePathMatches(options, 'x/q.js')).to.equal(true);

        cb();
      });
    });

    describe('when the `sourceFilePath` is not in the the `sourceDirectory`', function() {
      it('should return `false`', function(cb) {
        const options = {
          targetPath: 'x/q.js',
          sourceDirectory: 'a'
        };

        expect(browserify.sourceFilePathMatches(options, 'x/q.js')).to.equal(false);

        cb();
      });
    });
  });

  describe('compileAllFiles', function() {
  });

  describe('watch', function() {
  });
});
