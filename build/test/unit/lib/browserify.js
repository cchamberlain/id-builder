"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var expect = require("chai").expect;
var mkdirp = _interopRequire(require("mkdirp"));

var rimraf = _interopRequire(require("rimraf"));

var browserify = _interopRequireWildcard(require("../../../lib/browserify"));

var randomString = require("../../../lib/tests").randomString;


describe("browserify", function () {
  beforeEach(function (cb) {
    this.directoryPath = ".tmp/" + randomString();

    mkdirp(this.directoryPath, cb);
  });

  afterEach(function (cb) {
    rimraf(this.directoryPath, cb);
  });

  describe("source-extension", function () {
    it("should be defined", function (cb) {
      expect(browserify.sourceExtension).to.be.a("string")["with"].length.above(0);

      cb();
    });
  });

  describe("target-extension", function () {
    it("should be defined", function (cb) {
      expect(browserify.targetExtension).to.be.a("string")["with"].length.above(0);

      cb();
    });
  });

  describe("path-reloads(options, path)", function () {});

  describe("source-file-path-matches", function () {
    describe("when the `source-file-path` is the `target-path`", function () {
      it("should return `false`", function (cb) {
        var options = {
          targetPath: "x/y.js",
          sourceDirectory: "x"
        };

        expect(browserify.sourceFilePathMatches(options, "x/y.js")).to.equal(false);

        cb();
      });
    });

    describe("when the `source-file-path` is in the the `source-directory`", function () {
      it("should return `true`", function (cb) {
        var options = {
          targetPath: "x/y.js",
          sourceDirectory: "x"
        };

        expect(browserify.sourceFilePathMatches(options, "x/q.js")).to.equal(true);

        cb();
      });
    });

    describe("when the `source-file-path` is not in the the `source-directory`", function () {
      it("should return `false`", function (cb) {
        var options = {
          targetPath: "x/q.js",
          sourceDirectory: "a"
        };

        expect(browserify.sourceFilePathMatches(options, "x/q.js")).to.equal(false);

        cb();
      });
    });
  });

  describe("compile-all-files", function () {});

  describe("watch", function () {});
});