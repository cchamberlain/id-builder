"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var log = _interopRequire(require("loglevel"));

var expect = require("chai").expect;

var mkdirp = _interopRequire(require("mkdirp"));

var rimraf = _interopRequire(require("rimraf"));

var browserify = _interopRequireWildcard(require("../build/../../../lib/browserify"));

var randomString = require("../build/../../../lib/tests").randomString;

describe("browserify", function () {
  beforeEach(function (cb) {
    this.directoryPath = ".tmp/" + randomString();

    mkdirp(this.directoryPath, cb);
  });

  afterEach(function (cb) {
    rimraf(this.directoryPath, cb);
  });

  describe("sourceExtension", function () {
    it("should be defined", function (cb) {
      expect(browserify.sourceExtension).to.be.a("string")["with"].length.above(0);

      cb();
    });
  });

  describe("targetExtension", function () {
    it("should be defined", function (cb) {
      expect(browserify.targetExtension).to.be.a("string")["with"].length.above(0);

      cb();
    });
  });

  describe("pathReloads(options, path)", function () {});

  describe("sourceFilePathMatches", function () {
    describe("when the `sourceFilePath` is the `targetPath`", function () {
      it("should return `false`", function (cb) {
        var options = {
          targetPath: "x/y.js",
          sourceDirectory: "x"
        };

        expect(browserify.sourceFilePathMatches(options, "x/y.js")).to.equal(false);

        cb();
      });
    });

    describe("when the `sourceFilePath` is in the the `sourceDirectory`", function () {
      it("should return `true`", function (cb) {
        var options = {
          targetPath: "x/y.js",
          sourceDirectory: "x"
        };

        expect(browserify.sourceFilePathMatches(options, "x/q.js")).to.equal(true);

        cb();
      });
    });

    describe("when the `sourceFilePath` is not in the the `sourceDirectory`", function () {
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

  describe("compileAllFiles", function () {});

  describe("watch", function () {});
});