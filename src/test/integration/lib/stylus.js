'use strict';

import fs from 'fs';

import log from 'loglevel';
import { expect } from 'chai';
import mkdirp from 'mkdirp';
import rimraf from 'rimraf';

import stylus from '../build/../../../lib/stylus';
import { randomString } from '../build/../../../lib/tests';

const functionSource = 'body\n  h1\n    background-color #000';
const functionOutputSource = 'body h1 {\n  background-color: #000;\n}\n';

describe('stylus', function() {
  beforeEach(function (cb) {
    this.directoryPath = '.tmp/' + Math.random().toString(36).slice(7);
    mkdirp(this.directoryPath, cb);
  });

  afterEach(function (cb) {
    rimraf(this.directoryPath, cb);
  });

  describe('sourceExtension', function () {
    it('should be defined', function (cb) {
      expect(stylus.sourceExtension)
        .to.be.a('string')
        .with.length.above(0);

      cb();
    });
  });

  describe('targetExtension', function () {
    it('should be defined', function (cb) {
      expect(stylus.targetExtension)
        .to.be.a('string')
        .with.length.above(0);

      cb();
    });
  });

  describe('sourceFilePathMatches', function () {
    describe('when the `sourceFilePath` is located in the `options.sourceDirectoryPath`', function () {
      describe('when the path ends in `stylus.sourceExtension`', function () {
        it('should return `true`.', function(cb) {
          const options = {
            sourceDirectoryPath: 'x'
          };

          expect(stylus.sourceFilePathMatches(options, 'x/q.styl')).to.equal(true);

          cb();
        });
      });

      describe('when the path does not end in `stylus.sourceExtension`', function () {
        it('should return `false`.', function(cb) {
          const options = {
            sourceDirectoryPath: 'x'
          };

          expect(stylus.sourceFilePathMatches(options, 'x/q.something')).to.equal(false);

          cb();
        });
      });
    });

    describe('when the `sourceFilePath` is not located in the `options.sourceDirectoryPath`', function () {
      it('should return `false`.', function(cb) {
        const options = {
          sourceDirectoryPath: 'x'
        };

        expect(stylus.sourceFilePathMatches(options, 'y/q.styl')).to.equal(false);

        cb();
      });
    });
  });

  describe('compileChunk', function() {
    describe('when the `options` is an object, the chunk is valid Stylus source and the callback is a function', function () {
      it('should call the callback without an error and compiled code', function(cb) {
        const options = {};
        const chunk = functionSource;
        const expected = functionOutputSource;

        stylus.compileChunk(options, chunk, function(e, actual) {
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

    describe('when compiling one source file with valid Stylus', function() {
      it('should compile one build file that matches the expected output', function(cb) {
        const options = {};
        const chunk = functionSource;
        const expected = functionOutputSource;
        const sourceFilePath = `${this.directoryPath}/src/file.styl`;
        const buildFilePath = `${this.directoryPath}/build/file.css`;

        fs.writeFile(sourceFilePath, chunk, e => {
          if (e) { cb(e); }

          stylus.compileFile(options, sourceFilePath, buildFilePath, e => {
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

    describe('when compiling many source files with valid Stylus', function() {
      it('should compile all file to built files that match the expected output', function(cb) {
        const options = {
          sourceDirectoryPath: this.sourceDirectoryPath,
          targetDirectoryPath: this.buildDirectoryPath
        };
        const chunk = functionSource;
        const expected = functionOutputSource;
        const sourceFilePathOne = `${this.directoryPath}/src/one.styl`;
        const buildFilePathOne = `${this.directoryPath}/build/one.css`;
        const sourceFilePathTwo = `${this.directoryPath}/src/two.styl`;
        const buildFilePathTwo = `${this.directoryPath}/build/two.css`;

        fs.writeFile(sourceFilePathOne, chunk, e => {
          if (e) { cb(e); }


          fs.writeFile(sourceFilePathTwo, chunk, e => {
            if (e) { cb(e); }

            stylus.compileAllFiles(options, e => {
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

