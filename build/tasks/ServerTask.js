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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

var _foreverMonitor = require('forever-monitor');

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _libPromise = require('../lib/promise');

var _libPromise2 = _interopRequireDefault(_libPromise);

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

    this.sourceDirectoryPaths = this.configuration.sourceDirectoryPaths;

    this.monitors = {};
  }

  _createClass(ServerTask, [{
    key: 'addPath',
    value: function addPath(path) {
      // log.debug(`ServerTask#addPath(${path})`);

      var monitor = new _foreverMonitor.Monitor(path, {
        command: 'node'
      });

      this.monitors[path] = monitor;

      monitor.start();

      _libLogging2['default'].taskInfo(this.constructor.name, 'Started ' + path);
    }
  }, {
    key: 'removePath',
    value: function removePath(path) {
      // log.debug(`ServerTask#removePath(${path})`);

      var monitor = this.monitors[path];

      if (!monitor) {
        _libLogging2['default'].taskInfo(this.constructor.name, 'Monitor not found for ' + path);
      }

      monitor.kill(true);

      delete this.monitors[path];

      _libLogging2['default'].taskInfo(this.constructor.name, 'Stopped ' + path);
    }
  }, {
    key: 'restartPath',
    value: function restartPath(path) {
      // log.debug(`ServerTask#restartPath(${path})`);

      var monitor = this.monitors[path];

      monitor.restart();
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
    value: function startServer(filePath) {
      var doesExist, monitor;
      return regeneratorRuntime.async(function startServer$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap(_libPromise2['default'].promiseFromCallback(_fs2['default'].exists, filePath));

          case 2:
            doesExist = context$2$0.sent;

            if (doesExist) {
              context$2$0.next = 6;
              break;
            }

            _libLogging2['default'].taskInfo(this.constructor.name, 'Skipping: "' + filePath + '" (Does not exist).');

            return context$2$0.abrupt('return');

          case 6:
            monitor = this.monitors[filePath];

            if (monitor) {
              this.restartPath(filePath);
            } else {
              this.addPath(filePath);
            }

            return context$2$0.abrupt('return', new Promise.resolve());

          case 9:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'stopServer',
    value: function stopServer(filePath) {
      var doesExist, monitor;
      return regeneratorRuntime.async(function stopServer$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap(_libPromise2['default'].promiseFromCallback(_fs2['default'].exists, filePath));

          case 2:
            doesExist = context$2$0.sent;

            if (doesExist) {
              context$2$0.next = 6;
              break;
            }

            _libLogging2['default'].taskInfo(this.constructor.name, 'Skipping: "' + filePath + '" (Does not exist).');

            return context$2$0.abrupt('return');

          case 6:
            monitor = this.monitors[filePath];

            if (monitor) {
              this.removePath(filePath);
            } else {
              _libLogging2['default'].taskInfo(this.constructor.name, 'skipping ' + filePath + ' (Monitor does not exist).');
            }

          case 8:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'restartServer',
    value: function restartServer(filePath) {
      var doesExist;
      return regeneratorRuntime.async(function restartServer$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap(_libPromise2['default'].promiseFromCallback(_fs2['default'].exists, filePath));

          case 2:
            doesExist = context$2$0.sent;

            if (doesExist) {
              context$2$0.next = 6;
              break;
            }

            _libLogging2['default'].taskInfo(this.constructor.name, 'Skipping: "' + filePath + '" (Does not exist).');

            return context$2$0.abrupt('return');

          case 6:

            this.removePath(filePath);
            this.addPath(filePath);

          case 8:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'run',
    value: function run() {
      return regeneratorRuntime.async(function run$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap(Promise.all(_lodash2['default'].map(this.configuration.paths, this.startServer)));

          case 2:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }]);

  return ServerTask;
})(_libTask2['default']);

exports['default'] = ServerTask;
module.exports = exports['default'];

// log.debug(`ServerTask#startServer(${filePath})`);

// log.debug(`ServerTask#stopServer(${filePath})`);

// log.debug(`ServerTask#restartServer(${filePath})`);