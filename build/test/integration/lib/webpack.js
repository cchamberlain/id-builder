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

var _webpack = require('../build/../../../lib/webpack');

var _webpack2 = _interopRequireWildcard(_webpack);

var _randomString = require('../build/../../../lib/tests');

var functionSource = 'var x = function(y) { return y * 2; };';

describe('webpack', function () {
  beforeEach(function (cb) {
    this.directoryPath = '.tmp/' + Math.random().toString(36).slice(7);

    _mkdirp2['default'](this.directoryPath, cb);
  });

  afterEach(function (cb) {
    _rimraf2['default'](this.directoryPath, cb);
  });

  //const matchesTargetPath = function(options, path) {
  //  return path === `${options.path}/${options.filename}`;
  //};
  describe('matchesTargetPath', function () {
    describe('when the `path` is the `targetPath`', function () {
      it('should return `true`', function (cb) {
        var options = {
          path: 'x',
          filename: 'y.js'
        };

        _expect.expect(_webpack2['default'].matchesTargetPath(options, 'x/y.js')).to.equal(true);

        cb();
      });
    });

    describe('when the `path` is not the `targetPath`', function () {
      it('should return `false`', function (cb) {
        var options = {
          path: 'x',
          filename: 'y.js'
        };

        _expect.expect(_webpack2['default'].matchesTargetPath(options, 'x/z.js')).to.equal(false);

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
        var options = {
          context: this.directoryPath,
          entry: '' + this.sourceDirectoryPath + '/entry.js',

          output: {
            filename: 'target.js',
            path: '' + this.buildDirectoryPath
          }
        };

        var chunk = functionSource;

        _fs2['default'].writeFile(options.entry, chunk, function (e) {
          if (e) {
            cb(e);
          }

          _webpack2['default'].compileAllFiles({ options: options }, function (e) {
            if (e) {
              cb(e);
            }

            _fs2['default'].readFile('' + options.output.path + '/' + options.output.filename, cb);
          });
        });
      });
    });
  });

  describe('watch', function () {});
});