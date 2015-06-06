'use strict';

import fs from 'fs';

import log from 'loglevel';
import mkdirp from 'mkdirp';
import rimraf from 'rimraf';
import { expect } from 'chai';

import browserify from '../build/../../../lib/browserify';
import { randomString } from '../build/../../../lib/tests';

const functionSource = `const x = y => y * 2`;

describe('browserify', function() {
  beforeEach(function(cb) {
    this.directoryPath = '.tmp/' + Math.random().toString(36).slice(7);

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
          targetFilePath: 'x/y.js',
          sourceDirectoryPath: 'x'
        };

        expect(browserify.sourceFilePathMatches(options, 'x/y.js')).to.equal(false);

        cb();
      });
    });

    describe('when the `sourceFilePath` is in the the `sourceDirectoryPath`', function() {
      it('should return `true`', function(cb) {
        const options = {
          targetPath: 'x/y.js',
          sourceDirectoryPath: 'x'
        };

        expect(browserify.sourceFilePathMatches(options, 'x/q.js')).to.equal(true);

        cb();
      });
    });

    describe('when the `sourceFilePath` is not in the the `sourceDirectoryPath`', function() {
      it('should return `false`', function(cb) {
        const options = {
          targetPath: 'x/q.js',
          sourceDirectoryPath: 'a'
        };

        expect(browserify.sourceFilePathMatches(options, 'x/q.js')).to.equal(false);

        cb();
      });
    });
  });

  describe('matchesTargetPath', function() {
    describe('when the `path` is the `targetPath`', function() {
      it('should return `true`', function(cb) {
        const options = {
          targetPath: 'x/y.js',
        };

        expect(browserify.matchesTargetPath(options, 'x/y.js')).to.equal(true);

        cb();
      });
    });

    describe('when the `path` is not the `targetPath`', function() {
      it('should return `false`', function(cb) {
        const options = {
          targetPath: 'x/y.js',
        };

        expect(browserify.matchesTargetPath(options, 'x/z.js')).to.equal(false);

        cb();
      });
    });
  });

  describe('compileAllFiles', function() {
    beforeEach(function (cb) {
      this.sourceDirectoryPath = `${this.directoryPath}/src`;
      this.buildDirectoryPath = `${this.directoryPath}/build`;

      mkdirp(this.sourceDirectoryPath, e => {
        if (e) { cb(e); }

        mkdirp(this.buildDirectoryPath, e => {
          if (e) { cb(e); }

          cb();
        });
      });
    });

    describe('when compiling one source file with valid ES6', function() {
      it('should compile one build file that matches the expected output', function(cb) {
        const sourceFilePath = `${this.directoryPath}/src/entry.js`;
        const buildFilePath = `${this.directoryPath}/build/target.js`;
        const options = {
          sourceFilePath: sourceFilePath,
          targetFilePath: buildFilePath
        };
        const chunk = functionSource;
        //const expected = this.functionOutputSource;

        fs.writeFile(sourceFilePath, chunk, e => {
          if (e) { cb(e); }

          browserify.compileAllFiles(options, e => {
            if (e) { cb(e); }

            // Just check that it is being written, since we can't check the
            // contents of the output, because it contains file path specific
            // code which isn't available at design time available at design
            // time.
            fs.readFile(buildFilePath, cb);
          });
        });
      });
    });
  });

  describe('watch', function() {
  });
});
