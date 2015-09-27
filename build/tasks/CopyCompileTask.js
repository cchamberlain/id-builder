'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _async = require('async');

var _libCompileTask = require('../lib/CompileTask');

var _libCompileTask2 = _interopRequireDefault(_libCompileTask);

var _compilersCopyCompiler = require('../compilers/CopyCompiler');

var _compilersCopyCompiler2 = _interopRequireDefault(_compilersCopyCompiler);

var CopyCompileTask = (function (_CompileTask) {
  _inherits(CopyCompileTask, _CompileTask);

  function CopyCompileTask() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, CopyCompileTask);

    _get(Object.getPrototypeOf(CopyCompileTask.prototype), 'constructor', this).call(this, options);

    this.compiler = new _compilersCopyCompiler2['default']();
  }

  _createClass(CopyCompileTask, [{
    key: 'doesntMatchOtherTaskSourceFilePath',

    // Check all other tasks for sourceFilePathMathches functions and
    // only return true if no other matches, so don't copy files any
    // other task is interested in.
    value: function doesntMatchOtherTaskSourceFilePath(node) {
      var result = true;

      _lodash2['default'].each(this.otherTasks, function (task) {
        if (task.sourceFilePathMatches && task.sourceFilePathMatches(node.fullPath)) {
          result = false;
        }
      });

      return result;
    }
  }, {
    key: 'getPaths',
    value: function getPaths(cb) {
      var _this = this;

      this.getFiles(this.sourceDirectoryPath, function (e, nodes) {
        if (e) {
          return cb(e);
        }

        var paths = (0, _lodash2['default'])(nodes).filter(_this.doesntMatchOtherTaskSourceFilePath.bind(_this)).map(function (v) {
          return v.fullPath;
        }).value();

        cb(null, paths);
      });
    }
  }, {
    key: 'compileChunk',
    value: function compileChunk(chunk, cb) {
      this.compiler.compileChunk(chunk).then(function (result) {
        cb(null, result);
      })['catch'](cb);
    }
  }, {
    key: 'compileAllFiles',
    value: function compileAllFiles(cb) {
      var _this2 = this;

      this.getPaths(function (e, paths) {
        if (e) {
          return cb(e);
        }

        var iteratePath = function iteratePath(currentSourceDirectoryPath, cb) {
          var currentTargetDirectoryPath = currentSourceDirectoryPath.replace(_this2.sourceDirectoryPath, _this2.targetDirectoryPath);

          _this2.compileFile(currentSourceDirectoryPath, currentTargetDirectoryPath, cb);
        };

        (0, _async.each)(paths, iteratePath, cb);
      });
    }
  }, {
    key: 'run',
    value: function run(cb) {
      this.compileAllFiles(cb);
    }
  }, {
    key: 'otherTasks',
    get: function get() {
      var _this3 = this;

      return _lodash2['default'].filter(this.builder.taskInstances, function (v, k) {
        if (k !== _this3.name) {
          return v;
        }
      });
    }
  }]);

  return CopyCompileTask;
})(_libCompileTask2['default']);

exports['default'] = CopyCompileTask;
module.exports = exports['default'];