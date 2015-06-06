'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _import = require('lodash');

var _import2 = _interopRequireWildcard(_import);

var _log = require('loglevel');

var _log2 = _interopRequireWildcard(_log);

var _moment = require('moment');

var _moment2 = _interopRequireWildcard(_moment);

var _auto = require('async');

var _logging = require('./lib/logging');

var _logging2 = _interopRequireWildcard(_logging);

var _defaultOptions = require('./lib/defaultOptions');

var _defaultOptions2 = _interopRequireWildcard(_defaultOptions);

var _parseOptions = require('./lib/parseOptions');

var _parseOptions2 = _interopRequireWildcard(_parseOptions);

var _tasks = require('./tasks');

var _tasks2 = _interopRequireWildcard(_tasks);

'use strict';

var runTaskWithOptions = function runTaskWithOptions(options, task, name) {
  return function (cb) {
    var taskOptions = options.tasks[name];

    if (!taskOptions) {
      return cb('No options found for task "' + name + '".');
    }

    if (!taskOptions.enabled) {
      //logging.disabledTask(name);
      return cb();
    }

    taskOptions.taskName = name;

    _logging2['default'].startTask(name);

    task.run(taskOptions, function (e) {
      if (e) {
        return cb(e);
      }

      _logging2['default'].finishTask(name);

      cb();
    });
  };
};

exports['default'] = function (_x, cb) {
  var inputOptions = arguments[0] === undefined ? {} : arguments[0];

  var options = global.options = _parseOptions2['default'](_defaultOptions2['default'], inputOptions);

  if (options.logging && typeof options.logging.level === 'string' && options.logging.level.length > 0) {
    _log2['default'].setLevel(options.logging.level);
  }

  var autoTasks = _import2['default'].reduce(_tasks2['default'], function (m, v, k) {
    m[k] = v.dependencies.concat(runTaskWithOptions(options, v, k));

    return m;
  }, {});

  _auto.auto(autoTasks, cb);
};

;
module.exports = exports['default'];