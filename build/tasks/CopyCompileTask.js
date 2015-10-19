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

var _libPromise = require('../lib/promise');

var _libPromise2 = _interopRequireDefault(_libPromise);

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
    value: function getPaths() {
      return regeneratorRuntime.async(function getPaths$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap((0, _libGetFiles2['default'])(this.sourceDirectoryPath));

          case 2:
            context$2$0.t0 = context$2$0.sent;

            context$2$0.t1 = function (v) {
              return v.fullPath;
            };

            context$2$0.t2 = this.doesntMatchOtherTaskSourceFilePath.bind(this);
            return context$2$0.abrupt('return', (0, _lodash2['default'])(context$2$0.t0).map(context$2$0.t1).filter(context$2$0.t2).value());

          case 6:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'compileAllFiles',
    value: function compileAllFiles() {
      var paths;
      return regeneratorRuntime.async(function compileAllFiles$(context$2$0) {
        var _this = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap(this.getPaths());

          case 2:
            paths = context$2$0.sent;
            context$2$0.next = 5;
            return regeneratorRuntime.awrap(Promise.all(_lodash2['default'].map(paths, function (path) {
              return _this.compileFile(path, path.replace(_this.sourceDirectoryPath, _this.targetDirectoryPath));
            })));

          case 5:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'otherCompileTasks',
    get: function get() {
      return (0, _lodash2['default'])(this.taskQueue.taskInstances).filter(this.isCompileTask).filter(this.isntThisTask).value();
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