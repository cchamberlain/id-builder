'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireDefault(_rimraf);

var _chai = require('chai');

var _buildLibFileSystem = require('../build/../../../lib/fileSystem');

var _buildLibFileSystem2 = _interopRequireDefault(_buildLibFileSystem);

var _buildLibTests = require('../build/../../../lib/tests');

var functionSource = 'const x = y => y * 2';

describe('fileSystem', function () {
  beforeEach(function (cb) {
    this.directoryPath = '.tmp/' + Math.random().toString(36).slice(7);

    (0, _mkdirp2['default'])(this.directoryPath, cb);
  });

  afterEach(function (cb) {
    (0, _rimraf2['default'])(this.directoryPath, cb);
  });

  describe('debug', function () {});

  describe('info', function () {});

  describe('warn', function () {});

  describe('error', function () {});

  describe('arrowCharacter', function () {});

  describe('taskInfo', function () {});

  describe('taskWarn', function () {});

  describe('taskError', function () {});

  describe('disabledTask', function () {});

  describe('startTask', function () {});

  describe('finishTask', function () {});
});