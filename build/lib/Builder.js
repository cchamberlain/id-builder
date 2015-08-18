'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _import = require('lodash');

var _import2 = _interopRequireWildcard(_import);

var _auto = require('async');

var _logging = require('./logging');

var _logging2 = _interopRequireWildcard(_logging);

var Builder = (function () {
  function Builder() {
    var options = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Builder);

    this.options = options;

    this.tasks = {};
    this.taskInstances = {};
    this.asyncTasks = {};
  }

  _createClass(Builder, [{
    key: '_getTaskOptions',

    // Gets the options belonging to the task of `name`.
    value: function _getTaskOptions(name) {
      return this.options.tasks[name];
    }
  }, {
    key: '_ensureTaskInstances',

    // Instantiates all the tasks.
    // TODO: Find a better way to do this.
    value: function _ensureTaskInstances() {
      var _this = this;

      _import2['default'].each(this.tasks, function (Task, name) {
        var options = _this._getTaskOptions(name);

        if (!options) {
          throw new Error('No options found for task "' + name + '".');
        }

        if (!options.enabled) {
          return;
        }

        // TODO: Refactor this out.
        options.taskName = name;

        // Pass the builder to the Task for scope.
        options.builder = _this;

        _this.taskInstances[name] = new Task(options);
      });
    }
  }, {
    key: '_ensureAsyncTasks',

    // Converts Task to async.auto format until I find a better solution.
    value: function _ensureAsyncTasks() {
      var _this2 = this;

      _import2['default'].each(this.taskInstances, function (taskInstance, name) {
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

      _auto.auto(this.asyncTasks, cb);
    }
  }, {
    key: '_createTaskCallback',
    value: function _createTaskCallback(name, task) {
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
  }, {
    key: 'addTask',

    // TODO: Actually convert all the tasks to Task classes.
    value: function addTask(task) {
      this.tasks[task.name] = task;
    }
  }, {
    key: 'addTasks',
    value: function addTasks(tasks) {
      _import2['default'].each(tasks, this.addTask.bind(this));
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