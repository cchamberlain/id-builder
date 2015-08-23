'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _readFile$writeFile = require('fs');

var _dirname = require('path');

var _import = require('lodash');

var _import2 = _interopRequireWildcard(_import);

var _lsr = require('lsr');

var _lsr2 = _interopRequireWildcard(_lsr);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireWildcard(_mkdirp);

var _each = require('async');

var _Task2 = require('./Task');

var _Task3 = _interopRequireWildcard(_Task2);

var _logging = require('../lib/logging');

var _logging2 = _interopRequireWildcard(_logging);

var CompileTask = (function (_Task) {
  function CompileTask() {
    var options = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, CompileTask);

    _get(Object.getPrototypeOf(CompileTask.prototype), 'constructor', this).call(this, options);

    this.sourceFileExtension = options.sourceFileExtension;
    this.targetFileExtension = options.targetFileExtension;
    this.sourceDirectoryPath = options.sourceDirectoryPath;
    this.targetDirectoryPath = options.targetDirectoryPath;
  }

  _inherits(CompileTask, _Task);

  _createClass(CompileTask, [{
    key: 'sourceFilePathMatchExpression',
    get: function () {
      return new RegExp('^' + this.sourceDirectoryPath + '.+\\.' + this.sourceFileExtension + '$');
    }
  }, {
    key: 'sourceFilePathMatches',
    value: function sourceFilePathMatches(sourceFilePath) {
      return !!sourceFilePath.match(this.sourceFilePathMatchExpression);
    }
  }, {
    key: 'targetPathReplaceExpression',
    get: function () {
      return new RegExp('\\.' + this.sourceFileExtension + '$');
    }
  }, {
    key: 'getTargetPath',
    value: function getTargetPath(sourceFilePath) {
      return sourceFilePath.replace(this.sourceDirectoryPath, this.targetDirectoryPath).replace(this.targetPathReplaceExpression, '.' + this.targetFileExtension);
    }
  }, {
    key: 'getFiles',
    value: function getFiles(path, cb) {
      _lsr2['default'](path, function (e, nodes) {
        if (e) {
          return cb(e);
        }

        var filteredNodes = _import2['default'].filter(nodes, function (v) {
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
      _mkdirp2['default'](_dirname.dirname(targetFilePath), cb);
    }
  }, {
    key: 'compileChunk',

    // Reference implementation. Just returns the chunk.
    value: function compileChunk(chunk, cb) {
      cb(null, chunk);
    }
  }, {
    key: 'compileFile',
    value: function compileFile(sourceFilePath, targetFilePath, cb) {
      var _this = this;

      _readFile$writeFile.readFile(sourceFilePath, function (e, fileContent) {
        if (e) {
          return cb(e);
        }

        _this.compileChunk(fileContent.toString(), function (e, compiledChunk) {
          if (e) {
            _logging2['default'].taskWarn(_this.constructor.name, '' + sourceFilePath + ': ' + e);
            return cb();
          }

          _this.ensureFileDirectory(targetFilePath, function (e) {
            if (e) {
              return cb(e);
            }

            _readFile$writeFile.writeFile(targetFilePath, compiledChunk, function (e) {
              if (e) {
                return cb(e);
              }

              _logging2['default'].taskInfo(_this.constructor.name, '' + sourceFilePath + ' => ' + targetFilePath);

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

        var paths = _import2['default'](sourceFilePaths).map(function (v) {
          return v.fullPath;
        }).filter(_this2.sourceFilePathMatches.bind(_this2)).value();

        _each.each(paths, function (currentSourceFilePath, cb) {
          _this2.compileFile(currentSourceFilePath, _this2.getTargetPath(currentSourceFilePath), cb);
        }, cb);
      });
    }
  }]);

  return CompileTask;
})(_Task3['default']);

exports['default'] = CompileTask;
module.exports = exports['default'];