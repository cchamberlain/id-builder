'use strict';

import fs from 'fs';

import log from 'loglevel';
import mkdirp from 'mkdirp';
import rimraf from 'rimraf';
import { expect } from 'chai';

import webpack from '../build/../../../lib/webpack';
import { randomString } from '../build/../../../lib/tests';

const functionSource = `var x = function(y) { return y * 2; };`;

describe('webpack', function() {
  beforeEach(function(cb) {
    this.directoryPath = '.tmp/' + Math.random().toString(36).slice(7);

    mkdirp(this.directoryPath, cb);
  });

  afterEach(function(cb) {
    rimraf(this.directoryPath, cb);
  });

  //const matchesTargetPath = function(options, path) {
  //  return path === `${options.path}/${options.filename}`;
  //};
  describe('matchesTargetPath', function() {
    describe('when the `path` is the `targetPath`', function() {
      it('should return `true`', function(cb) {
        const options = {
          path: 'x',
          filename: 'y.js'
        };

        expect(webpack.matchesTargetPath(options, 'x/y.js')).to.equal(true);

        cb();
      });
    });

    describe('when the `path` is not the `targetPath`', function() {
      it('should return `false`', function(cb) {
        const options = {
          path: 'x',
          filename: 'y.js'
        };

        expect(webpack.matchesTargetPath(options, 'x/z.js')).to.equal(false);

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
        const options = {
          context: this.directoryPath,
          entry: `${this.sourceDirectoryPath}/entry.js`,

          output: {
            filename: 'target.js',
            path: `${this.buildDirectoryPath}`
          }
        };

        const chunk = functionSource;

        fs.writeFile(options.entry, chunk, e => {
          if (e) { cb(e); }

          webpack.compileAllFiles({ options: options }, e => {
            if (e) { cb(e); }

            fs.readFile(`${options.output.path}/${options.output.filename}`, cb);
          });
        });
      });
    });
  });

  describe('watch', function() {
  });
});
