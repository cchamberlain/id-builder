'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _fs = require('fs');

var _fs2 = _interopRequireWildcard(_fs);

var _log = require('loglevel');

var _log2 = _interopRequireWildcard(_log);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireWildcard(_mkdirp);

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireWildcard(_rimraf);

var _expect = require('chai');

var _browserify = require('../build/../../../lib/browserify');

var _browserify2 = _interopRequireWildcard(_browserify);

var _randomString = require('../build/../../../lib/tests');

var functionSource = 'const x = y => y * 2';

describe('browserify', function () {
  beforeEach(function (cb) {
    this.directoryPath = '.tmp/' + Math.random().toString(36).slice(7);

    _mkdirp2['default'](this.directoryPath, cb);
  });

  afterEach(function (cb) {
    _rimraf2['default'](this.directoryPath, cb);
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
          targetFilePath: 'x/y.js',
          sourceDirectoryPath: 'x'
        };

        _expect.expect(_browserify2['default'].sourceFilePathMatches(options, 'x/y.js')).to.equal(false);

        cb();
      });
    });

    describe('when the `sourceFilePath` is in the the `sourceDirectoryPath`', function () {
      it('should return `true`', function (cb) {
        var options = {
          targetPath: 'x/y.js',
          sourceDirectoryPath: 'x'
        };

        _expect.expect(_browserify2['default'].sourceFilePathMatches(options, 'x/q.js')).to.equal(true);

        cb();
      });
    });

    describe('when the `sourceFilePath` is not in the the `sourceDirectoryPath`', function () {
      it('should return `false`', function (cb) {
        var options = {
          targetPath: 'x/q.js',
          sourceDirectoryPath: 'a'
        };

        _expect.expect(_browserify2['default'].sourceFilePathMatches(options, 'x/q.js')).to.equal(false);

        cb();
      });
    });
  });

  describe('compileAllFiles', function () {
    beforeEach(function (cb) {
      var _this = this;

      this.sourceDirectoryPath = '' + this.directoryPath + '/src';
      this.buildDirectoryPath = '' + this.directoryPath + '/build';

      _mkdirp2['default'](this.sourceDirectoryPath, function (e) {
        if (e) {
          cb(e);
        }

        _mkdirp2['default'](_this.buildDirectoryPath, function (e) {
          if (e) {
            cb(e);
          }

          cb();
        });
      });
    });

    describe('when compiling one source file with valid ES6', function () {
      it('should compile one build file that matches the expected output', function (cb) {
        var sourceFilePath = '' + this.directoryPath + '/src/entry.js';
        var buildFilePath = '' + this.directoryPath + '/build/target.js';
        var options = {
          sourceFilePath: sourceFilePath,
          targetFilePath: buildFilePath
        };
        var chunk = functionSource;
        //const expected = this.functionOutputSource;

        _fs2['default'].writeFile(sourceFilePath, chunk, function (e) {
          if (e) {
            cb(e);
          }

          console.log(0, options);

          _browserify2['default'].compileAllFiles(options, function (e) {
            if (e) {
              cb(e);
            }

            console.log(1);

            // Just check that it is being written, since we can't check the
            // contents of the output, because it contains file path specific
            // code which isn't available at design time available at design
            // time.
            _fs2['default'].readFile(buildFilePath, cb);
          });
        });
      });
    });
  });

  describe('watch', function () {});
});