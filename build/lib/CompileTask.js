'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _fs = require('fs');

var _path = require('path');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _lsr = require('lsr');

var _lsr2 = _interopRequireDefault(_lsr);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _async = require('async');

var _Task2 = require('./Task');

var _Task3 = _interopRequireDefault(_Task2);

var _libLogging = require('../lib/logging');

var _libLogging2 = _interopRequireDefault(_libLogging);

var CompileTask = (function (_Task) {
  _inherits(CompileTask, _Task);

  function CompileTask() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, CompileTask);

    _get(Object.getPrototypeOf(CompileTask.prototype), 'constructor', this).call(this, options);

    this.sourceFileExtension = options.sourceFileExtension;
    this.targetFileExtension = options.targetFileExtension;
    this.sourceDirectoryPath = options.sourceDirectoryPath;
    this.targetDirectoryPath = options.targetDirectoryPath;
  }

  _createClass(CompileTask, [{
    key: 'sourceFilePathMatches',
    value: function sourceFilePathMatches(sourceFilePath) {
      return !!sourceFilePath.match(this.sourceFilePathMatchExpression);
    }
  }, {
    key: 'getTargetPath',
    value: function getTargetPath(sourceFilePath) {
      return sourceFilePath.replace(this.sourceDirectoryPath, this.targetDirectoryPath).replace(this.targetPathReplaceExpression, '.' + this.targetFileExtension);
    }
  }, {
    key: 'getFiles',
    value: function getFiles(path, cb) {
      (0, _lsr2['default'])(path, function (e, nodes) {
        if (e) {
          return cb(e);
        }

        var filteredNodes = _lodash2['default'].filter(nodes, function (v) {
          if (v.isFile()) {
            return v;
          }
        });

        cb(null, filteredNodes);
      });
    }
  }, {
    key: 'ensureFileDirectory',
    value: function ensureFileDirectory(targetFilePath, cb) {
      (0, _mkdirp2['default'])((0, _path.dirname)(targetFilePath), cb);
    }

    // Reference implementation. Just returns the chunk.
  }, {
    key: 'compileChunk',
    value: function compileChunk(chunk, cb) {
      cb(null, chunk);
    }
  }, {
    key: 'compileFile',
    value: function compileFile(sourceFilePath, targetFilePath, cb) {
      var _this = this;

      (0, _fs.readFile)(sourceFilePath, function (e, fileContent) {
        if (e) {
          return cb(e);
        }

        _this.compileChunk(fileContent.toString(), function (e, compiledChunk) {
          if (e) {
            _libLogging2['default'].taskWarn(_this.constructor.name, sourceFilePath + ': ' + e);
            return cb();
          }

          _this.ensureFileDirectory(targetFilePath, function (e) {
            if (e) {
              return cb(e);
            }

            (0, _fs.writeFile)(targetFilePath, compiledChunk, function (e) {
              if (e) {
                return cb(e);
              }

              _libLogging2['default'].taskInfo(_this.constructor.name, sourceFilePath + ' => ' + targetFilePath);

              cb(null);
            });
          });
        });
      });
    }
  }, {
    key: 'compileAllFiles',
    value: function compileAllFiles(cb) {
      var _this2 = this;

      this.getFiles(this.sourceDirectoryPath, function (e, sourceFilePaths) {
        if (e) {
          return cb(e);
        }

        var paths = (0, _lodash2['default'])(sourceFilePaths).map(function (v) {
          return v.fullPath;
        }).filter(_this2.sourceFilePathMatches.bind(_this2)).value();

        (0, _async.each)(paths, function (currentSourceFilePath, cb) {
          _this2.compileFile(currentSourceFilePath, _this2.getTargetPath(currentSourceFilePath), cb);
        }, cb);
      });
    }
  }, {
    key: 'sourceFilePathMatchExpression',
    get: function get() {
      return new RegExp('^' + this.sourceDirectoryPath + '.+\\.' + this.sourceFileExtension + '$');
    }
  }, {
    key: 'targetPathReplaceExpression',
    get: function get() {
      return new RegExp('\\.' + this.sourceFileExtension + '$');
    }
  }]);

  return CompileTask;
})(_Task3['default']);

exports['default'] = CompileTask;
module.exports = exports['default'];