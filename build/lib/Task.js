'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

/**
 * Represents one thing to be done. May be a long running task.
 * TODO: add a removeDependencies(array) method.
 * @class Task
 */

var Task = (function () {
  function Task() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Task);

    this.options = options;

    this.taskQueue = options.taskQueue;

    this.dependencies = options.dependencies || [];
  }

  /**
   * Adds a dependency.
   * @param {String} name The name of the dependency.
   * @return Task The instance.
   */

  _createClass(Task, [{
    key: 'addDependency',
    value: function addDependency(name) {
      this.dependencies.push(name);
      this.dependencies = _lodash2['default'].uniq(this.dependencies);

      return this;
    }

    /**
     * Removes a dependency.
     * @param {String} name The name of the dependency.
     * @return Task The instance.
     */
  }, {
    key: 'removeDependency',
    value: function removeDependency(name) {
      this.dependencies = _lodash2['default'].without(this.dependencies, name);

      return this;
    }

    /**
     * Adds an Array of strings as dependencies.
     * @param {Array} dependencies An array of strings.
     * @return Task The instance.
     */
  }, {
    key: 'addDependencies',
    value: function addDependencies(dependencies) {
      var _this = this;

      _lodash2['default'].each(dependencies, function (dependency) {
        _this.addDependency(dependency);
      });

      return this;
    }

    /**
     * Starts the task.
     * @param {Function} cb The callback function.
     */
  }, {
    key: 'start',
    value: function start(cb) {
      if (!this.run) {
        throw new Error('No run function set.');
      }

      // TODO: This is horrible!
      this.__proto__.run.call(this, cb);
    }
  }]);

  return Task;
})();

exports['default'] = Task;
module.exports = exports['default'];