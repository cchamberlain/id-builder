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
 * Queue
 * The Queue runs the tasks. Tasks may be added to the queue one by one or
 * in batch. Tasks may have dependencies on other tasks so they are started when
 * all the dependencies are met.
 *
 * Can't have deps on tasks that are running.
 *
 * Task
 * Gets run by the queue. They are subclasses of the Task class and
 * implement an async `run` function.
 *
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
    /**
     * Approach 1:
     * {
     *   foo: [ fn ],
     *   bar: [ 'foo', fn ],
     *   baz: [ 'foo', fn ],
     *   meh: [ 'bar', 'baz', fn ]
     * }
     *
     *     __ bar __
     *    /         \
     * foo           meh
     *    \__ baz __/
     *
     */

    /**
     * Approach 2:
     * {
     *   herp: {
     *     foo: [ fn ],
     *     bar: [ 'foo', fn ],
     *     baz: [ 'foo', fn ],
     *     meh: [ 'bar', 'baz', fn ]
     *   },
     *   derp: {
     *     foo: [ fn ],
     *     bar: [ 'foo', fn ],
     *     baz: [ 'herp.bar', 'foo', fn ],
     *     meh: [ 'bar', 'baz', fn ]
     *   }
     * }
     *
     *                   derp
     *                  _-bar---
     *                ,'        \
     *             foo           meh
     *               '-_--baz---'
     *                /
     *       herp    |
     *      _-bar---'
     *    ,'        \
     * foo           meh
     *   '----baz---'
     *
     */

    /**
     *
     * What does a task need in order to be tracked? What properties?
     *
     * name: String
     * class: String
     * dependencies: [ String, ... ]
     * running: Boolean
     * completed: Boolean
     * config: Object
     *
     * This config fits in JSON, and JSON can be a DSL.
     *
     * Remove the running and completed property in the dsl, as it is a runtime
     * private API.
     *
     * taskQueue.addTasks([
     *   {
     *     name: 'CompileBabel#12345',
     *     class: 'CompileBabel',
     *     dependencies: [ ],
     *     config: {
     *       some: 'stuff'
     *     }
     *   },
     *   {
     *     name: 'CompileBrowserify#23456',
     *     class: 'CompileBrowserify',
     *     dependencies: [ 'CompileBabel#12345' ],
     *     config: {
     *       some: 'stuff'
     *     }
     *   }
     * ]);
     *
     * Treats it as a separate graph. Graphs may have interdependencies because
     * names are still global, not per graph.
     *
     * Insert a bunch of compile tasks for files individually and have the
     * algorithm generate a graph that determined the browserify should happen
     * after each individual compile is complete.
     *
     * JSON can go very far.
     *   - Databases
     *   - remote files
     *   - REST
     *   - websockets
     *   - local files
     *   - localStorage
     *   - levelDB
     *
     * Globally don't have more then strictly one or two of the same class and
     * config (so file paths etc). New entries are thrown away.
     *   - One: One queued and none running.
     *   - Two: One queued and one running.
     *
     * One that is running and one queued. If there is
     *   - What happens to a graph with an element that is a duplicate?
     *     - Create a proxy to the "original" allowing this graph to continue.
     *
     * Say I have a Task (with a .run() that is async) and a TaskQueue and this
     * API https://gist.github.com/Industrial/978500593fc516533710 (the API is
     * new, I want to make it JSON based instead of passing instances). The
     * Queue would see all the entries as a graph and run it all in parallel
     * where possible and in series for dependencies. So a task is either
     * queued, running or complete. I think I want to remove them from the Queue
     * graph by graph when they are complete. What I want to know is if it would
     * be possible when i'd add a new graph to have a dependency from one
     * graph's node to another graph's node Hmm. I'm not sure why I need that
     * really.. :P I'm using it to run tasks like compile babel (and many other
     * languages) into target languages, browserify, run test, generate
     * documentation, run browsersync servers and app servers and reload it all
     * on change. Guess it's an out of control gulp setup not using any gulp
     * source anymore, but I want to upgrade the queue from a simple
     * async.auto() to something that keeps running and I can keep adding
     * tasks/graphs to in real time so I can put it into a different module.
     * What I want to be able to do is detect a file change and add these
     * tasks: Compile Babel -> Compile Browserify -> Reload Browsersync but when
     * in the mean time before browserify has started I do another file save. I
     * dont want to add another browserify and browsersync task. I want to
     * optimize the existing running graph ..
     *
     *
     */
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