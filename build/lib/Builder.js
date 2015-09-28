'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _async = require('async');

var _logging = require('./logging');

var _logging2 = _interopRequireDefault(_logging);

var Builder = (function () {
  function Builder() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Builder);

    this.options = options;

    this.tasks = {};
    this.taskInstances = {};
    this.asyncTasks = {};

    this.compilers = {};
  }

  // Gets the options belonging to the task of `name`.

  _createClass(Builder, [{
    key: '_getTaskOptions',
    value: function _getTaskOptions(name) {
      return this.options.tasks[name];
    }

    // Instantiates all the tasks.
    // TODO: Find a better way to do this.
  }, {
    key: '_ensureTaskInstances',
    value: function _ensureTaskInstances() {
      var _this = this;

      _lodash2['default'].each(this.tasks, function (Task, name) {
        var options = _this._getTaskOptions(name);

        if (!options) {
          throw new Error('No options found for task "' + name + '".');
        }

        if (!options.enabled) {
          // Fake a task that does nothing
          _this.taskInstances[name] = {
            dependencies: []
          };
        } else {
          // Pass the builder to the Task for scope.
          options.builder = _this;

          _this.taskInstances[name] = new Task(options);
        }
      });
    }

    // Converts Task to async.auto format until I find a better solution.
  }, {
    key: '_ensureAsyncTasks',
    value: function _ensureAsyncTasks() {
      var _this2 = this;

      _lodash2['default'].each(this.taskInstances, function (taskInstance, name) {
        _this2.asyncTasks[name] = taskInstance.dependencies.concat(_this2._createTaskCallback(name, taskInstance));
      });
    }
  }, {
    key: '_runTasks',
    value: function _runTasks(cb) {
      // First instantiate all tasks with their options.
      this._ensureTaskInstances();

      // Then ensure the async tree looks the same.
      this._ensureAsyncTasks();

      (0, _async.auto)(this.asyncTasks, cb);
    }
  }, {
    key: '_createTaskCallback',
    value: function _createTaskCallback(name, task) {
      // Make sure all callbacks get fired for dependencies wether they run or not.
      if (!task.start) {
        return function (cb) {
          _logging2['default'].skipTask(name);
          cb();
        };
      }

      return function (cb) {
        _logging2['default'].startTask(name);

        task.start(function (e) {
          if (e) {
            return cb(e);
          }

          _logging2['default'].finishTask(name);

          cb();
        });
      };
    }

    // TODO: Actually convert all the tasks to Task classes.
  }, {
    key: 'addTask',
    value: function addTask(task) {
      this.tasks[task.name] = task;
    }
  }, {
    key: 'addTasks',
    value: function addTasks(tasks) {
      _lodash2['default'].each(tasks, this.addTask.bind(this));
    }
  }, {
    key: 'addCompiler',
    value: function addCompiler(compiler) {
      var name = compiler.constructor.name;

      this.compilers[name] = compiler;
    }
  }, {
    key: 'removeCompiler',
    value: function removeCompiler(compiler) {
      var name = compiler.constructor.name;

      delete this.compilers[name];
    }
  }, {
    key: 'start',
    value: function start(cb) {
      this._runTasks(cb);
    }
  }]);

  return Builder;
})();

exports['default'] = Builder;
module.exports = exports['default'];