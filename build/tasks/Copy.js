'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _import = require('lodash');

var _import2 = _interopRequireWildcard(_import);

var _each = require('async');

var _CompileTask2 = require('../lib/CompileTask');

var _CompileTask3 = _interopRequireWildcard(_CompileTask2);

var Copy = (function (_CompileTask) {
  function Copy() {
    var options = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Copy);

    _get(Object.getPrototypeOf(Copy.prototype), 'constructor', this).call(this, options);

    this.dependencies = ['DirectoryCleaner'];
  }

  _inherits(Copy, _CompileTask);

  _createClass(Copy, [{
    key: 'otherTasks',
    get: function () {
      var _this = this;

      return _import2['default'].filter(this.builder.taskInstances, function (v, k) {
        if (k !== _this.name) {
          return v;
        }
      });
    }
  }, {
    key: 'doesntMatchOtherTaskSourceFilePath',

    // Check all other tasks for sourceFilePathMathches functions and
    // only return true if no other matches, so don't copy files any
    // other task is interested in.
    value: function doesntMatchOtherTaskSourceFilePath(node) {
      var result = true;

      _import2['default'].each(this.otherTasks, function (task) {
        if (task.sourceFilePathMatches && task.sourceFilePathMatches(node.fullPath)) {
          result = false;
        }
      });

      return result;
    }
  }, {
    key: 'getPaths',
    value: function getPaths(cb) {
      var _this2 = this;

      this.getFiles(this.sourceDirectoryPath, function (e, nodes) {
        if (e) {
          return cb(e);
        }

        var paths = _import2['default'](nodes).filter(_this2.doesntMatchOtherTaskSourceFilePath.bind(_this2)).map(function (v) {
          return v.fullPath;
        }).value();

        cb(null, paths);
      });
    }
  }, {
    key: 'compileChunk',

    // Just return the chunk to perform a copy file CompileTask#compileFile.
    // Explicitly defined to show the behaviour.
    value: function compileChunk(chunk, cb) {
      cb(null, chunk);
    }
  }, {
    key: 'run',
    value: function run(cb) {
      var _this3 = this;

      this.getPaths(function (e, paths) {
        if (e) {
          return cb(e);
        }

        var iteratePath = function iteratePath(currentSourceDirectoryPath, cb) {
          var currentTargetDirectoryPath = currentSourceDirectoryPath.replace(_this3.sourceDirectoryPath, _this3.targetDirectoryPath);

          _this3.compileFile(currentSourceDirectoryPath, currentTargetDirectoryPath, cb);
        };

        _each.each(paths, iteratePath, cb);
      });
    }
  }]);

  return Copy;
})(_CompileTask3['default']);

exports['default'] = Copy;
module.exports = exports['default'];