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

var _browserSync = require('browser-sync');

var _browserSync2 = _interopRequireDefault(_browserSync);

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireDefault(_chokidar);

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

var _libCompileTask = require('../lib/CompileTask');

var _libCompileTask2 = _interopRequireDefault(_libCompileTask);

var _libTask = require('../lib/Task');

var _libTask2 = _interopRequireDefault(_libTask);

function logError(error) {
  _loglevel2['default'].error(error.stack || error.message || error);
}

var WatchTask = (function (_Task) {
  _inherits(WatchTask, _Task);

  function WatchTask() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, WatchTask);

    _get(Object.getPrototypeOf(WatchTask.prototype), 'constructor', this).call(this, options);

    this.watcher = null;
    this.compilers = null;

    _lodash2['default'].bindAll(this, ['_handleAdd', '_handleAddDir', '_handleChange', '_handleUnlink', '_handleUnlinkDir', '_handleError']);
  }

  _createClass(WatchTask, [{
    key: '_handleAdd',
    value: function _handleAdd(path) {
      this._handleChange(path);
    }
  }, {
    key: '_handleAddDir',
    value: function _handleAddDir(path) {
      // Get all files in path (recursive).
      // Do a handleChange for all files in path.
      // This is shitty with Browserify. Somehow I need to only browserify at the
      // end of all the other compiles.
    }
  }, {
    key: '_handleChangeBrowsersync',
    value: function _handleChangeBrowsersync(path) {
      var browserSyncTask = this.getBrowserSyncTask();

      browserSyncTask.reload(path);
    }
  }, {
    key: '_handleChangeCompileTask',
    value: function _handleChangeCompileTask(path, compileTask) {
      var targetPath = compileTask.getTargetPath(path);

      compileTask.compileFile(path, targetPath, function (e) {
        if (e) {
          return logError(e);
        }
      });
    }
  }, {
    key: '_handleChangeTestTask',
    value: function _handleChangeTestTask(path) {
      var testTask = this.getTestTask();

      if (testTask) {
        var shouldReload = !!(0, _lodash2['default'])(testTask.watchDirectoryPaths).filter(function (directoryPath) {
          if (_lodash2['default'].startsWith(path, directoryPath)) {
            return true;
          }
        }).value().length;

        if (shouldReload) {
          testTask.runTests(function (error) {
            if (error) {
              return logError(error);
            }
          });
        }
      }
    }
  }, {
    key: '_handleChangeServerTask',
    value: function _handleChangeServerTask(path) {
      var serverTask = this.getServerTaskForPath(path);

      if (serverTask) {
        serverTask.restartServer(path, function (e) {
          if (e) {
            return logError(e);
          }
        });
      }
    }
  }, {
    key: '_handleChange',
    value: function _handleChange(path) {
      this._handleChangeBrowsersync(path);
      this._handleChangeTestTask(path);

      var compileTask = this.getCompilerTaskForPath(path);

      if (compileTask) {
        this._handleChangeCompileTask(path, compileTask);
      } else {
        this._handleChangeServerTask(path);
      }
    }
  }, {
    key: '_handleUnlink',
    value: function _handleUnlink(path) {
      _loglevel2['default'].debug('WatchTask#_handleUnlink', path);
    }
  }, {
    key: '_handleUnlinkDir',
    value: function _handleUnlinkDir(path) {
      _loglevel2['default'].debug('WatchTask#_handleUnlinkDir', path);
    }
  }, {
    key: '_handleError',
    value: function _handleError(error) {
      _loglevel2['default'].error(error.stack || error.message || error);
    }
  }, {
    key: 'getCompilerTasks',
    value: function getCompilerTasks() {
      return (0, _lodash2['default'])(this.taskQueue.taskInstances).filter(function (v) {
        return v instanceof _libCompileTask2['default'];
      }).value();
    }
  }, {
    key: 'getTestTask',
    value: function getTestTask() {
      // TODO: Is this horrible?
      return this.taskQueue.taskInstances.TestTask;
    }
  }, {
    key: 'getServerTask',
    value: function getServerTask() {
      // TODO: Is this horrible?
      return this.taskQueue.taskInstances.ServerTask;
    }
  }, {
    key: 'getBrowserSyncTask',
    value: function getBrowserSyncTask() {
      // TODO: Is this horrible?
      return this.taskQueue.taskInstances.BrowserSyncServerTask;
    }
  }, {
    key: 'getCompilerTaskForPath',
    value: function getCompilerTaskForPath(path) {
      var compilerTasks = this.getCompilerTasks();

      return _lodash2['default'].find(compilerTasks, function (task) {
        return task.sourceFilePathMatches(path);
      });
    }
  }, {
    key: 'getServerTaskForPath',
    value: function getServerTaskForPath(path) {
      var serverTask = this.getServerTask();

      if (serverTask.sourceFilePathMatches(path)) {
        return serverTask;
      }
    }
  }, {
    key: 'setWatcher',
    value: function setWatcher() {
      this.watcher = _chokidar2['default'].watch(this.options.paths, {
        atomic: true,
        ignoreInitial: true,
        // ignored: /[\/\/]\./,
        persistent: true,
        usePolling: true
      });
    }
  }, {
    key: 'setEventHandlers',
    value: function setEventHandlers() {
      this.watcher.on('add', this._handleAdd);
      this.watcher.on('addDir', this._handleAddDir);
      this.watcher.on('change', this._handleChange);
      this.watcher.on('unlink', this._handleUnlink);
      this.watcher.on('unlinkDir', this._handleUnlinkDir);
      this.watcher.on('error', this._handleError);
    }
  }, {
    key: 'run',
    value: function run() {
      this.setWatcher();
      this.setEventHandlers();
    }
  }]);

  return WatchTask;
})(_libTask2['default']);

exports['default'] = WatchTask;
module.exports = exports['default'];