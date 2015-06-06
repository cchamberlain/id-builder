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

var _browsersync = require('../build/../../../lib/browsersync');

var _browsersync2 = _interopRequireWildcard(_browsersync);

var _randomString = require('../build/../../../lib/tests');

var functionSource = 'const x = y => y * 2';

describe('browsersync', function () {
  beforeEach(function (cb) {
    this.directoryPath = '.tmp/' + Math.random().toString(36).slice(7);

    _mkdirp2['default'](this.directoryPath, cb);
  });

  afterEach(function (cb) {
    _rimraf2['default'](this.directoryPath, cb);
  });

  describe('sourceFilePathMatches', function () {});

  describe('runServer', function () {});

  describe('reload', function () {});
});

// See implementation of copy.sourceFilePathMatches tests.