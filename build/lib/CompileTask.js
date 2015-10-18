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

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _Compiler = require('./Compiler');

var _Compiler2 = _interopRequireDefault(_Compiler);

var _Task2 = require('./Task');

var _Task3 = _interopRequireDefault(_Task2);

var _libGetFiles = require('../lib/getFiles');

var _libGetFiles2 = _interopRequireDefault(_libGetFiles);

var _libLogging = require('../lib/logging');

var _libLogging2 = _interopRequireDefault(_libLogging);

var _libPromise = require('../lib/promise');

var _libPromise2 = _interopRequireDefault(_libPromise);

/**
 * Compiles code from one language to another using a Compiler. May compile in
 * three ways:
 *  - Compiling a chunk (string) to another chunk.
 *  - Compiling a file from a source path to a target path.
 *  - Compiling a directory of files recursively from a source path to a target
 *    path, compiling all files that match.
 * @class CompileTask
 */

var CompileTask = (function (_Task) {
  _inherits(CompileTask, _Task);

  function CompileTask() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, CompileTask);

    _get(Object.getPrototypeOf(CompileTask.prototype), 'constructor', this).call(this, options);

    this.sourceFileExtension = this.configuration.sourceFileExtension;
    this.targetFileExtension = this.configuration.targetFileExtension;
    this.sourceDirectoryPath = this.configuration.sourceDirectoryPath;
    this.targetDirectoryPath = this.configuration.targetDirectoryPath;
    this.compilerOptions = this.configuration.compiler;

    this.setCompiler(_Compiler2['default']);
  }

  /**
   * Returns the expression used by the `sourceFilePathMatches` method.
   * @return {RegExp} The regular expression.
   */

  _createClass(CompileTask, [{
    key: 'sourceFilePathMatches',

    /**
     * Returns `true` when a file path matches.
     * @param {String} sourceFilePath The source file path.
     * @return {boolean}
     */
    value: function sourceFilePathMatches(sourceFilePath) {
      return !!sourceFilePath.match(this.sourceFilePathMatchExpression);
    }

    /**
     * Returns the expression used by the `getTargetPath` method.
     * @return {RegExp} The regular expression.
     */
  }, {
    key: 'getTargetPath',

    /**
     * Gets the target file path for a source file path.
     * TODO: Rename to getTargetFilePath, because it is the path of a file.
     * @param {String} sourceFilePath The source file path.
     * @return {String} The target file path.
     */
    value: function getTargetPath(sourceFilePath) {
      return sourceFilePath.replace(this.sourceDirectoryPath, this.targetDirectoryPath).replace(this.targetPathReplaceExpression, '.' + this.targetFileExtension);
    }

    /**
     * Sets the compiler used to compile chunks. Also adds the Compiler to the
     * TaskQueue but ensures only one Compiler per instance is active in the
     * TaskQueue.
     * TODO: Explain why it's a good thing to only have one compiler in the
     *       taskQueue per compile task.
     * TODO: Refactor: Move this to the TaskQueue class.
     * @param {Class} CompilerClass The compiler class used to compile chunks.
     * @returns CompileTask The instance.
     */
  }, {
    key: 'setCompiler',
    value: function setCompiler(CompilerClass) {
      // First remove the currently set compiler from the taskqueue.
      if (this.compiler) {
        this.taskQueue.removeCompiler(this.compiler);
      }

      // Then set the the new compiler
      this.compiler = new CompilerClass(this.compilerOptions);

      // And add it to the taskQueue
      this.taskQueue.addCompiler(this.compiler);

      return this;
    }

    /**
     * Ensures that a directory is available to write a file to. Creates all
     * parent directories of the file path.
     * @param {String} targetFilePath The target file path.
     */
  }, {
    key: 'ensureFileDirectory',
    value: function ensureFileDirectory(targetFilePath) {
      return regeneratorRuntime.async(function ensureFileDirectory$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap(_libPromise2['default'].promiseFromNodeCallback(_mkdirp2['default'], _path2['default'].dirname(targetFilePath)));

          case 2:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }

    /**
     * Reads a file from the `sourceFilePath`, compiles it using the set compiler
     * and writes it to the `targetFilePath`.
     * @param {String} sourceFilePath The source file path.
     * @param {String} targetFilePath The target file path.
     */
  }, {
    key: 'compileFile',
    value: function compileFile(sourceFilePath, targetFilePath) {
      var fileContent, compiledChunk;
      return regeneratorRuntime.async(function compileFile$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap(_libPromise2['default'].promiseFromNodeCallback(_fs2['default'].readFile, sourceFilePath));

          case 2:
            fileContent = context$2$0.sent;
            context$2$0.prev = 3;
            context$2$0.next = 6;
            return regeneratorRuntime.awrap(this.compiler.compileChunk(fileContent.toString(), sourceFilePath));

          case 6:
            compiledChunk = context$2$0.sent;
            context$2$0.next = 9;
            return regeneratorRuntime.awrap(this.ensureFileDirectory(targetFilePath));

          case 9:
            context$2$0.next = 11;
            return regeneratorRuntime.awrap(_libPromise2['default'].promiseFromNodeCallback(_fs2['default'].writeFile, targetFilePath, compiledChunk));

          case 11:

            _libLogging2['default'].taskInfo(this.constructor.name, sourceFilePath + ' => ' + targetFilePath);
            context$2$0.next = 17;
            break;

          case 14:
            context$2$0.prev = 14;
            context$2$0.t0 = context$2$0['catch'](3);

            _libLogging2['default'].taskWarn(this.constructor.name, sourceFilePath + ': ' + (context$2$0.t0.stack || context$2$0.t0.message || context$2$0.t0));

          case 17:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[3, 14]]);
    }

    /**
     * Compiles a directory of files recursively from a source path to a target
     * path, compiling all files that match.
     */
  }, {
    key: 'compileAllFiles',
    value: function compileAllFiles() {
      var sourceFiles, matchingSourceFilePaths, compileFilePromises;
      return regeneratorRuntime.async(function compileAllFiles$(context$2$0) {
        var _this = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap((0, _libGetFiles2['default'])(this.sourceDirectoryPath));

          case 2:
            sourceFiles = context$2$0.sent;
            matchingSourceFilePaths = (0, _lodash2['default'])(sourceFiles).map(function (v) {
              return v.fullPath;
            }).filter(this.sourceFilePathMatches.bind(this)).value();
            compileFilePromises = _lodash2['default'].map(matchingSourceFilePaths, function (path) {
              return _this.compileFile(path, _this.getTargetPath(path));
            });
            context$2$0.next = 7;
            return regeneratorRuntime.awrap(Promise.all(compileFilePromises));

          case 7:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }

    /**
     * Runs the task.
     */
  }, {
    key: 'run',
    value: function run() {
      return regeneratorRuntime.async(function run$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap(this.compileAllFiles());

          case 2:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
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