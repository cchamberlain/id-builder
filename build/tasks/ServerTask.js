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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

var _foreverMonitor = require('forever-monitor');

var _async = require('async');

var _libLogging = require('../lib/logging');

var _libLogging2 = _interopRequireDefault(_libLogging);

var _libTask = require('../lib/Task');

var _libTask2 = _interopRequireDefault(_libTask);

var ServerTask = (function (_Task) {
  _inherits(ServerTask, _Task);

  function ServerTask() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, ServerTask);

    _get(Object.getPrototypeOf(ServerTask.prototype), 'constructor', this).call(this, options);

    _lodash2['default'].bindAll(this, ['addPath', 'removePath', 'restartPath', 'sourceFilePathMatches', 'startServer', 'stopServer', 'restartServer', 'run']);

    this.sourceDirectoryPaths = options.sourceDirectoryPaths;

    this.monitors = {};
  }

  _createClass(ServerTask, [{
    key: 'addPath',
    value: function addPath(path, cb) {
      var monitor = new _foreverMonitor.Monitor(path, {
        command: 'node'
      });

      this.monitors[path] = monitor;

      monitor.start();

      _libLogging2['default'].taskInfo(this.constructor.name, 'Started ' + path);

      cb();
    }
  }, {
    key: 'removePath',
    value: function removePath(path, cb) {
      var monitor = this.monitors[path];

      if (!monitor) {
        _libLogging2['default'].taskInfo(this.constructor.name, 'Monitor not found for ' + path);
        cb();
      }

      monitor.kill(true);

      delete this.monitors[path];

      _libLogging2['default'].taskInfo(this.constructor.name, 'Stopped ' + path);

      cb();
    }
  }, {
    key: 'restartPath',
    value: function restartPath(path, cb) {
      var monitor = this.monitors[path];

      monitor.restart();

      cb();
    }
  }, {
    key: 'sourceFilePathMatches',
    value: function sourceFilePathMatches(sourceFilePath) {
      return !!(0, _lodash2['default'])(this.sourceDirectoryPaths).any(function (sourceDirectoryPath) {
        return sourceFilePath.match(new RegExp('^' + sourceDirectoryPath));
      });
    }
  }, {
    key: 'startServer',
    value: function startServer(filePath, cb) {
      var _this = this;

      (0, _fs.exists)(filePath, function (result) {
        if (!result) {
          _libLogging2['default'].taskInfo(_this.constructor.name, 'skipping ' + filePath + ' (Does not exist).');
          return cb();
        }

        var monitor = _this.monitors[filePath];

        if (monitor) {
          _this.restartPath(filePath, cb);
        } else {
          _this.addPath(filePath, cb);
        }
      });
    }
  }, {
    key: 'stopServer',
    value: function stopServer(filePath, cb) {
      var _this2 = this;

      (0, _fs.exists)(filePath, function (result) {
        if (!result) {
          _libLogging2['default'].taskInfo(_this2.constructor.name, 'skipping ' + filePath + ' (Does not exist).');
          return cb();
        }

        var monitor = _this2.monitors[filePath];

        if (monitor) {
          _this2.removePath(filePath, cb);
        } else {
          _libLogging2['default'].taskInfo(_this2.constructor.name, 'skipping ' + filePath + ' (Monitor does not exist).');
          cb();
        }
      });
    }
  }, {
    key: 'restartServer',
    value: function restartServer(filePath, cb) {
      var _this3 = this;

      (0, _fs.exists)(filePath, function (result) {
        if (!result) {
          _libLogging2['default'].taskInfo(_this3.constructor.name, 'skipping ' + filePath + ' (Does not exist).');
          return cb();
        }

        _this3.removePath(filePath, function (e) {
          if (e) {
            return cb(e);
          }

          _this3.addPath(filePath, cb);
        });
      });
    }
  }, {
    key: 'run',
    value: function run() {
      (0, _async.each)(this.options.paths, this.startServer, _lodash2['default'].noop);
    }
  }]);

  return ServerTask;
})(_libTask2['default']);

exports['default'] = ServerTask;
module.exports = exports['default'];