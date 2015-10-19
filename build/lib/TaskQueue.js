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

var _async2 = _interopRequireDefault(_async);

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

var _Configuration = require('./Configuration');

var _Configuration2 = _interopRequireDefault(_Configuration);

var _logging = require('./logging');

var _logging2 = _interopRequireDefault(_logging);

/**
 * The taskQueue runs the tasks.
 * TODO: Find a better solution then format juggling for async.auto.
 * @class TaskQueue
 */

var TaskQueue = (function () {
  function TaskQueue(configuration) {
    _classCallCheck(this, TaskQueue);

    // log.debug(`TaskQueue#constructor`);

    this.configuration = configuration;

    // TODO: Document.
    this.taskClasses = {};

    // TODO: Document.
    this.taskInstances = {};

    // TODO: Document.
    this.asyncTasks = {};

    // TODO: Document.
    this.compilers = {};
  }

  /**
   * Instantiates all the tasks.
   * @private
   */

  _createClass(TaskQueue, [{
    key: '_ensureTaskInstances',
    value: function _ensureTaskInstances() {
      var _this = this;

      // log.debug(`TaskQueue#_ensureTaskInstances`);

      _lodash2['default'].each(this.taskClasses, function (Task, name) {
        // TODO: Refactor: Move this into `Task`.
        var taskOptions = _this.configuration.get('tasks.' + name);

        if (!taskOptions) {
          throw new Error('No options found for task "' + name + '".');
        }

        if (!taskOptions.enabled) {
          // Fake a task that does nothing
          _this.taskInstances[name] = {
            dependencies: []
          };
        } else {
          _this.taskInstances[name] = new Task({
            taskQueue: _this
          });
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

      // log.debug(`TaskQueue#_ensureAsyncTasks`);

      _lodash2['default'].each(this.taskInstances, function (taskInstance, name) {
        _this2.asyncTasks[name] = taskInstance.dependencies.concat(_this2._createTaskCallback(name, taskInstance));
      });
    }

    /**
     * Runs all tasks asynchronously and in parallel with dependencies first.
     * @private
     */
  }, {
    key: '_runTasks',
    value: function _runTasks() {
      return regeneratorRuntime.async(function _runTasks$(context$2$0) {
        var _this3 = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            // log.debug(`TaskQueue#_runTasks`);

            // First instantiate all tasks with their options.
            this._ensureTaskInstances();

            // Then ensure the async tree looks the same.
            this._ensureAsyncTasks();

            return context$2$0.abrupt('return', new Promise(function (resolve, reject) {
              _async2['default'].auto(_this3.asyncTasks, function (error, result) {
                if (error) {
                  return reject(error);
                }

                resolve(result);
              });
            }));

          case 3:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
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

        task.start().then(function () {
          _logging2['default'].finishTask(name);

          cb();
        })['catch'](function (error) {
          cb(error);
        });
      };
    }

    /**
     * Adds a Task.
     * @param {Task} taskClass The task class.
     * @return TaskQueue The instance.
     */
  }, {
    key: 'addTaskClass',
    value: function addTaskClass(taskClass) {
      // log.debug(`TaskQueue#addTaskClass ${taskClass.name}`);

      this.taskClasses[taskClass.name] = taskClass;

      return this;
    }

    /**
     * Adds an Array of Task classes.
     * @param {Array} tasks The task classes.
     * @return TaskQueue The instance.
     */
  }, {
    key: 'addTaskClasses',
    value: function addTaskClasses(tasks) {
      // log.debug(`TaskQueue#addTaskClasses`);

      _lodash2['default'].each(tasks, this.addTaskClass.bind(this));

      return this;
    }

    /**
     * Adds a `Compiler`.
     * @param {Compiler} compiler The compiler.
     * @return TaskQueue The instance.
     */
  }, {
    key: 'addCompiler',
    value: function addCompiler(compiler) {
      // log.debug(`TaskQueue#addCompiler`);

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
      // log.debug(`TaskQueue#removeCompiler`);

      var name = compiler.constructor.name;

      delete this.compilers[name];

      return this;
    }

    /**
     * Starts the taskQueue.
     */
  }, {
    key: 'start',
    value: function start() {
      return regeneratorRuntime.async(function start$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return regeneratorRuntime.awrap(this._runTasks());

          case 2:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }]);

  return TaskQueue;
})();

exports['default'] = TaskQueue;
module.exports = exports['default'];

// log.debug(`TaskQueue#start`);