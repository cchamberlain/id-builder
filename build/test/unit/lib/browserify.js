'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _log = require('loglevel');

var _log2 = _interopRequireWildcard(_log);

var _expect = require('chai');

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireWildcard(_mkdirp);

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireWildcard(_rimraf);

var _browserify = require('../build/../../../lib/browserify');

var _browserify2 = _interopRequireWildcard(_browserify);

var _randomString = require('../build/../../../lib/tests');

describe('browserify', function () {
  var _this = this;

  beforeEach(function (cb) {
    _this.directoryPath = '.tmp/' + _randomString.randomString();

    _mkdirp2['default'](_this.directoryPath, cb);
  });

  afterEach(function (cb) {
    _rimraf2['default'](_this.directoryPath, cb);
  });

  describe('sourceExtension', function () {
    it('should be defined', function (cb) {
      _expect.expect(_browserify2['default'].sourceExtension).to.be.a('string')['with'].length.above(0);

      cb();
    });
  });

  describe('targetExtension', function () {
    it('should be defined', function (cb) {
      _expect.expect(_browserify2['default'].targetExtension).to.be.a('string')['with'].length.above(0);

      cb();
    });
  });

  describe('pathReloads(options, path)', function () {});

  describe('sourceFilePathMatches', function () {
    describe('when the `sourceFilePath` is the `targetPath`', function () {
      it('should return `false`', function (cb) {
        var options = {
          targetPath: 'x/y.js',
          sourceDirectory: 'x'
        };

        _expect.expect(_browserify2['default'].sourceFilePathMatches(options, 'x/y.js')).to.equal(false);

        cb();
      });
    });

    describe('when the `sourceFilePath` is in the the `sourceDirectory`', function () {
      it('should return `true`', function (cb) {
        var options = {
          targetPath: 'x/y.js',
          sourceDirectory: 'x'
        };

        _expect.expect(_browserify2['default'].sourceFilePathMatches(options, 'x/q.js')).to.equal(true);

        cb();
      });
    });

    describe('when the `sourceFilePath` is not in the the `sourceDirectory`', function () {
      it('should return `false`', function (cb) {
        var options = {
          targetPath: 'x/q.js',
          sourceDirectory: 'a'
        };

        _expect.expect(_browserify2['default'].sourceFilePathMatches(options, 'x/q.js')).to.equal(false);

        cb();
      });
    });
  });

  describe('compileAllFiles', function () {});

  describe('watch', function () {});
});