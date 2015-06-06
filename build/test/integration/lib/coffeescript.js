'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _fs = require('fs');

var _fs2 = _interopRequireWildcard(_fs);

var _log = require('loglevel');

var _log2 = _interopRequireWildcard(_log);

var _expect = require('chai');

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireWildcard(_mkdirp);

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireWildcard(_rimraf);

var _coffeescript = require('../build/../../../lib/coffeescript');

var _coffeescript2 = _interopRequireWildcard(_coffeescript);

var _randomString = require('../build/../../../lib/tests');

var functionSource = 'x = (y) -> y * 2';
var functionOutputSource = 'var x;\n\nx = function(y) {\n  return y * 2;\n};\n';

describe('coffeescript', function () {
  beforeEach(function (cb) {
    this.directoryPath = '.tmp/' + Math.random().toString(36).slice(7);
    _mkdirp2['default'](this.directoryPath, cb);
  });

  afterEach(function (cb) {
    _rimraf2['default'](this.directoryPath, cb);
  });

  describe('sourceExtension', function () {
    it('should be defined', function (cb) {
      _expect.expect(_coffeescript2['default'].sourceExtension).to.be.a('string')['with'].length.above(0);

      cb();
    });
  });

  describe('targetExtension', function () {
    it('should be defined', function (cb) {
      _expect.expect(_coffeescript2['default'].targetExtension).to.be.a('string')['with'].length.above(0);

      cb();
    });
  });

  describe('sourceFilePathMatches', function () {
    describe('when the `sourceFilePath` is located in the `options.sourceDirectoryPath`', function () {
      describe('when the path ends in `coffeescript.sourceExtension`', function () {
        it('should return `true`.', function (cb) {
          var options = {
            sourceDirectoryPath: 'x'
          };

          _expect.expect(_coffeescript2['default'].sourceFilePathMatches(options, 'x/q.coffee')).to.equal(true);

          cb();
        });
      });

      describe('when the path does not end in `coffeescript.sourceExtension`', function () {
        it('should return `false`.', function (cb) {
          var options = {
            sourceDirectoryPath: 'x'
          };

          _expect.expect(_coffeescript2['default'].sourceFilePathMatches(options, 'x/q.something')).to.equal(false);

          cb();
        });
      });
    });

    describe('when the `sourceFilePath` is not located in the `options.sourceDirectoryPath`', function () {
      it('should return `false`.', function (cb) {
        var options = {
          sourceDirectoryPath: 'x'
        };

        _expect.expect(_coffeescript2['default'].sourceFilePathMatches(options, 'y/q.coffee')).to.equal(false);

        cb();
      });
    });
  });

  describe('compileChunk', function () {
    describe('when the `options` is an object, the chunk is valid CoffeeScript source and the callback is a function', function () {
      it('should call the callback without an error and compiled code', function (cb) {
        var options = {};
        var chunk = functionSource;
        var expected = functionOutputSource;

        _coffeescript2['default'].compileChunk(options, chunk, function (e, actual) {
          if (e) {
            cb(e);
          }

          _expect.expect(actual).to.equal(expected);

          cb();
        });
      });
    });
  });

  describe('compileFile', function () {
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

    describe('when compiling one source file with valid CoffeeScript', function () {
      it('should compile one build file that matches the expected output', function (cb) {
        var options = {};
        var chunk = functionSource;
        var expected = functionOutputSource;
        var sourceFilePath = '' + this.directoryPath + '/src/file.coffee';
        var buildFilePath = '' + this.directoryPath + '/build/file.js';

        _fs2['default'].writeFile(sourceFilePath, chunk, function (e) {
          if (e) {
            cb(e);
          }

          _coffeescript2['default'].compileFile(options, sourceFilePath, buildFilePath, function (e) {
            if (e) {
              cb(e);
            }

            _fs2['default'].readFile(buildFilePath, function (e, fileBuffer) {
              if (e) {
                cb(e);
              }

              _expect.expect(fileBuffer.toString()).to.equal(expected);

              cb();
            });
          });
        });
      });
    });
  });

  describe('compileAllFiles', function () {
    beforeEach(function (cb) {
      var _this2 = this;

      this.sourceDirectoryPath = '' + this.directoryPath + '/src';
      this.buildDirectoryPath = '' + this.directoryPath + '/build';

      _mkdirp2['default'](this.sourceDirectoryPath, function (e) {
        if (e) {
          cb(e);
        }

        _mkdirp2['default'](_this2.buildDirectoryPath, function (e) {
          if (e) {
            cb(e);
          }

          cb();
        });
      });
    });

    describe('when compiling many source files with valid CoffeeScript', function () {
      it('should compile all file to built files that match the expected output', function (cb) {
        var options = {
          sourceDirectoryPath: this.sourceDirectoryPath,
          targetDirectoryPath: this.buildDirectoryPath
        };
        var chunk = functionSource;
        var expected = functionOutputSource;
        var sourceFilePathOne = '' + this.directoryPath + '/src/one.coffee';
        var buildFilePathOne = '' + this.directoryPath + '/build/one.js';
        var sourceFilePathTwo = '' + this.directoryPath + '/src/two.coffee';
        var buildFilePathTwo = '' + this.directoryPath + '/build/two.js';

        _fs2['default'].writeFile(sourceFilePathOne, chunk, function (e) {
          if (e) {
            cb(e);
          }

          _fs2['default'].writeFile(sourceFilePathTwo, chunk, function (e) {
            if (e) {
              cb(e);
            }

            _coffeescript2['default'].compileAllFiles(options, function (e) {
              if (e) {
                cb(e);
              }

              _fs2['default'].readFile(buildFilePathOne, function (e, fileBufferOne) {
                if (e) {
                  cb(e);
                }

                _fs2['default'].readFile(buildFilePathTwo, function (e, fileBufferTwo) {
                  if (e) {
                    cb(e);
                  }

                  _expect.expect(fileBufferOne.toString()).to.equal(expected);

                  _expect.expect(fileBufferTwo.toString()).to.equal(expected);

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