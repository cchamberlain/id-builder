'use strict';

import fs from 'fs';

import log from 'loglevel';
import { expect } from 'chai';
import mkdirp from 'mkdirp';
import rimraf from 'rimraf';

import coffeescript from '../build/../../../lib/coffeescript';
import { randomString } from '../build/../../../lib/tests';

const functionSource = 'x = (y) -> y * 2';
const functionOutputSource = 'var x;\n\nx = function(y) {\n  return y * 2;\n};\n';

describe('coffeescript', function() {
  beforeEach(function (cb) {
    this.directoryPath = '.tmp/' + Math.random().toString(36).slice(7);
    mkdirp(this.directoryPath, cb);
  });

  afterEach(function (cb) {
    rimraf(this.directoryPath, cb);
  });

  describe('sourceExtension', function () {
    it('should be defined', function (cb) {
      expect(coffeescript.sourceExtension)
        .to.be.a('string')
        .with.length.above(0);

      cb();
    });
  });

  describe('targetExtension', function () {
    it('should be defined', function (cb) {
      expect(coffeescript.targetExtension)
        .to.be.a('string')
        .with.length.above(0);

      cb();
    });
  });

  describe('sourceFilePathMatches', function () {
    describe('when the `sourceFilePath` is located in the `options.sourceDirectoryPath`', function () {
      describe('when the path ends in `coffeescript.sourceExtension`', function () {
        it('should return `true`.', function(cb) {
          const options = {
            sourceDirectoryPath: 'x'
          };

          expect(coffeescript.sourceFilePathMatches(options, 'x/q.coffee')).to.equal(true);

          cb();
        });
      });

      describe('when the path does not end in `coffeescript.sourceExtension`', function () {
        it('should return `false`.', function(cb) {
          const options = {
            sourceDirectoryPath: 'x'
          };

          expect(coffeescript.sourceFilePathMatches(options, 'x/q.something')).to.equal(false);

          cb();
        });
      });
    });

    describe('when the `sourceFilePath` is not located in the `options.sourceDirectoryPath`', function () {
      it('should return `false`.', function(cb) {
        const options = {
          sourceDirectoryPath: 'x'
        };

        expect(coffeescript.sourceFilePathMatches(options, 'y/q.coffee')).to.equal(false);

        cb();
      });
    });
  });

  describe('compileChunk', function() {
    describe('when the `options` is an object, the chunk is valid CoffeeScript source and the callback is a function', function () {
      it('should call the callback without an error and compiled code', function(cb) {
        const options = {};
        const chunk = functionSource;
        const expected = functionOutputSource;

        coffeescript.compileChunk(options, chunk, function(e, actual) {
          if (e) { cb(e); }

          expect(actual).to.equal(expected);

          cb();
        });
      });
    });
  });

  describe('compileFile', function() {
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

    describe('when compiling one source file with valid CoffeeScript', function() {
      it('should compile one build file that matches the expected output', function(cb) {
        const options = {};
        const chunk = functionSource;
        const expected = functionOutputSource;
        const sourceFilePath = `${this.directoryPath}/src/file.coffee`;
        const buildFilePath = `${this.directoryPath}/build/file.js`;

        fs.writeFile(sourceFilePath, chunk, e => {
          if (e) { cb(e); }

          coffeescript.compileFile(options, sourceFilePath, buildFilePath, e => {
            if (e) { cb(e); }

            fs.readFile(buildFilePath, (e, fileBuffer) => {
              if (e) { cb(e); }

              expect(fileBuffer.toString()).to.equal(expected);

              cb();
            });
          });
        });
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

    describe('when compiling many source files with valid CoffeeScript', function() {
      it('should compile all file to built files that match the expected output', function(cb) {
        const options = {
          sourceDirectoryPath: this.sourceDirectoryPath,
          targetDirectoryPath: this.buildDirectoryPath
        };
        const chunk = functionSource;
        const expected = functionOutputSource;
        const sourceFilePathOne = `${this.directoryPath}/src/one.coffee`;
        const buildFilePathOne = `${this.directoryPath}/build/one.js`;
        const sourceFilePathTwo = `${this.directoryPath}/src/two.coffee`;
        const buildFilePathTwo = `${this.directoryPath}/build/two.js`;

        fs.writeFile(sourceFilePathOne, chunk, e => {
          if (e) { cb(e); }


          fs.writeFile(sourceFilePathTwo, chunk, e => {
            if (e) { cb(e); }

            coffeescript.compileAllFiles(options, e => {
              if (e) { cb(e); }

              fs.readFile(buildFilePathOne, (e, fileBufferOne) => {
                if (e) { cb(e); }

                fs.readFile(buildFilePathTwo, (e, fileBufferTwo) => {
                  if (e) { cb(e); }

                  expect(fileBufferOne.toString()).to.equal(expected);

                  expect(fileBufferTwo.toString()).to.equal(expected);

                  cb();
                });
              });
            });
          });
        });
      });
    });
  });
});

