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

/**
 * The taskQueue runs the tasks.
 * TODO: Find a better solution then format juggling for async.auto.
 * @class TaskQueue
 */

var TaskQueue = (function () {
  function TaskQueue() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, TaskQueue);

    this.options = options;

    this.tasks = {};
    this.taskInstances = {};
    this.asyncTasks = {};

    this.compilers = {};
  }

  /**
   * Gets the options belonging to the task of `name`.
   * @param {String} name The name of the task.
   * @returns {Object} the options of the task.
   * @private
   */

  _createClass(TaskQueue, [{
    key: '_getTaskOptions',
    value: function _getTaskOptions(name) {
      return this.options.tasks[name];
    }

    /**
     * Instantiates all the tasks.
     * @private
     */
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
          // Pass the taskQueue to the Task for scope.
          options.taskQueue = _this;

          _this.taskInstances[name] = new Task(options);
        }
      });
    }

    /**
     * Converts Task to async.auto format until I find a better solution.
     * @private
     */
  }, {
    key: '_ensureAsyncTasks',
    value: function _ensureAsyncTasks() {
      var _this2 = this;

      _lodash2['default'].each(this.taskInstances, function (taskInstance, name) {
        _this2.asyncTasks[name] = taskInstance.dependencies.concat(_this2._createTaskCallback(name, taskInstance));
      });
    }

    /**
     * Runs all tasks asynchronously and in parallel with dependencies first.
     * @param {Function} cb The callback function.
     * @private
     */
  }, {
    key: '_runTasks',
    value: function _runTasks(cb) {
      // First instantiate all tasks with their options.
      this._ensureTaskInstances();

      // Then ensure the async tree looks the same.
      this._ensureAsyncTasks();

      (0, _async.auto)(this.asyncTasks, cb);
    }

    /**
     * Creates a callback for a task to be ran.
     * TODO: Better describe what this does.
     * @param {String} name The name of the task.
     * @param {Task} task The Task.
     * @returns {Function} The callback function.
     * @private
     */
  }, {
    key: '_createTaskCallback',
    value: function _createTaskCallback(name, task) {
      // Make sure all callbacks get fired for dependencies, whether they run or
      // not.
      // TODO: Explain better what this does. This description is not enough.
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

    /**
     * Adds a Task.
     * @param {Task} task The task.
     * @return TaskQueue The instance.
     */
  }, {
    key: 'addTask',
    value: function addTask(task) {
      this.tasks[task.name] = task;

      return this;
    }

    /**
     * Adds an Array of Task's.
     * @param {Array} tasks The tasks.
     * @return TaskQueue The instance.
     */
  }, {
    key: 'addTasks',
    value: function addTasks(tasks) {
      _lodash2['default'].each(tasks, this.addTask.bind(this));

      return this;
    }

    /**
     * Adds a compiler.
     * @param {Compiler} compiler The compiler.
     * @return TaskQueue The instance.
     */
  }, {
    key: 'addCompiler',
    value: function addCompiler(compiler) {
      var name = compiler.constructor.name;

      this.compilers[name] = compiler;

      return this;
    }

    /**
     * Removes a compiler.
     * @param {Compiler} compiler The compiler.
     * @return TaskQueue The instance.
     */
  }, {
    key: 'removeCompiler',
    value: function removeCompiler(compiler) {
      var name = compiler.constructor.name;

      delete this.compilers[name];

      return this;
    }

    /**
     * Starts the taskQueue.
     * @param {Function} cb The callback function.
     */
  }, {
    key: 'start',
    value: function start(cb) {
      this._runTasks(cb);
    }
  }]);

  return TaskQueue;
})();

exports['default'] = TaskQueue;
module.exports = exports['default'];