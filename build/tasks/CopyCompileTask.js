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

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

var _async = require('async');

var _libCompileTask = require('../lib/CompileTask');

var _libCompileTask2 = _interopRequireDefault(_libCompileTask);

var _libGetFiles = require('../lib/getFiles');

var _libGetFiles2 = _interopRequireDefault(_libGetFiles);

var _compilersCopyCompiler = require('../compilers/CopyCompiler');

var _compilersCopyCompiler2 = _interopRequireDefault(_compilersCopyCompiler);

function getNames(tasks) {
  return (0, _lodash2['default'])(tasks).pluck('constructor').pluck('name').value();
}

var CopyCompileTask = (function (_CompileTask) {
  _inherits(CopyCompileTask, _CompileTask);

  function CopyCompileTask() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, CopyCompileTask);

    _get(Object.getPrototypeOf(CopyCompileTask.prototype), 'constructor', this).call(this, options);

    this.setCompiler(_compilersCopyCompiler2['default']);

    _lodash2['default'].bindAll(this, ['isCompileTask', 'isntThisTask']);
  }

  _createClass(CopyCompileTask, [{
    key: 'isCompileTask',
    value: function isCompileTask(task) {
      return task instanceof _libCompileTask2['default'];
    }
  }, {
    key: 'isntThisTask',
    value: function isntThisTask(task) {
      return task.constructor.name !== this.constructor.name;
    }
  }, {
    key: 'sourceFilePathMatches',
    value: function sourceFilePathMatches(sourceFilePath) {
      return _get(Object.getPrototypeOf(CopyCompileTask.prototype), 'sourceFilePathMatches', this).call(this, sourceFilePath) && this.doesntMatchOtherTaskSourceFilePath(sourceFilePath);
    }

    // Check all other tasks for sourceFilePathMathches functions and
    // only return true if no other matches, so don't copy files any
    // other task is interested in.
  }, {
    key: 'doesntMatchOtherTaskSourceFilePath',
    value: function doesntMatchOtherTaskSourceFilePath(path) {
      var result = true;

      _lodash2['default'].each(this.otherCompileTasks, function (task) {
        if (task.sourceFilePathMatches && task.sourceFilePathMatches(path)) {
          result = false;
        }
      });

      return result;
    }
  }, {
    key: 'getPaths',
    value: function getPaths(cb) {
      var _this = this;

      (0, _libGetFiles2['default'])(this.sourceDirectoryPath, function (e, nodes) {
        if (e) {
          return cb(e);
        }

        var paths = (0, _lodash2['default'])(nodes).map(function (v) {
          return v.fullPath;
        }).filter(_this.doesntMatchOtherTaskSourceFilePath.bind(_this)).value();

        cb(null, paths);
      });
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
    key: 'otherCompileTasks',
    get: function get() {
      return (0, _lodash2['default'])(this.builder.taskInstances).filter(this.isCompileTask).filter(this.isntThisTask).value();
    }
  }, {
    key: 'sourceFilePathMatchExpression',
    get: function get() {
      return new RegExp('^' + this.sourceDirectoryPath + '.+$');
    }
  }]);

  return CopyCompileTask;
})(_libCompileTask2['default']);

exports['default'] = CopyCompileTask;
module.exports = exports['default'];