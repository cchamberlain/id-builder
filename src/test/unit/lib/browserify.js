"use strict";

const chai = require("chai");
const mkdirp = require("mkdirp");
const rimraf = require("rimraf");
const browserify = require("../../../lib/browserify");
const tests = require("../../../lib/tests");
const expect = chai.expect;

describe("browserify", function() {
  beforeEach(function(cb) {
    this.directoryPath = ".tmp/" + tests.randomString();

    mkdirp(this.directoryPath, cb);
  });

  afterEach(function(cb) {
    rimraf(this.directoryPath, cb);
  });

  describe("source-extension", function() {
    it("should be defined", function(cb) {
      expect(browserify.sourceExtension).to.be.a("string")["with"].length.above(0);

      cb();
    });
  });

  describe("target-extension", function() {
    it("should be defined", function(cb) {
      expect(browserify.targetExtension).to.be.a("string")["with"].length.above(0);

      cb();
    });
  });

  describe("path-reloads(options, path)", function() {
  });

  describe("source-file-path-matches", function() {
    describe("when the `source-file-path` is the `target-path`", function() {
      it("should return `false`", function(cb) {
        const options = {
          targetPath: "x/y.js",
          sourceDirectory: "x"
        };

        expect(browserify.sourceFilePathMatches(options, "x/y.js")).to.equal(false);

        cb();
      });
    });

    describe("when the `source-file-path` is in the the `source-directory`", function() {
      it("should return `true`", function(cb) {
        const options = {
          targetPath: "x/y.js",
          sourceDirectory: "x"
        };

        expect(browserify.sourceFilePathMatches(options, "x/q.js")).to.equal(true);

        cb();
      });
    });

    describe("when the `source-file-path` is not in the the `source-directory`", function() {
      it("should return `false`", function(cb) {
        const options = {
          targetPath: "x/q.js",
          sourceDirectory: "a"
        };

        expect(browserify.sourceFilePathMatches(options, "x/q.js")).to.equal(false);

        cb();
      });
    });
  });

  describe("compile-all-files", function() {
  });

  describe("watch", function() {
  });
});