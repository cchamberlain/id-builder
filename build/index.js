'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

var _minilog = require('minilog');

var minilog = _interopRequire(_minilog);

var _import = require('lodash');

var _ = _interopRequire(_import);

var _auto = require('async');

var _moment = require('moment');

var moment = _interopRequire(_moment);

var _import2 = require('./lib/log');

var log = _interopRequireWildcard(_import2);

var _defaultOptions = require('./lib/defaultOptions');

var defaultOptions = _interopRequire(_defaultOptions);

var _parseOptions = require('./lib/parseOptions');

var parseOptions = _interopRequire(_parseOptions);

var _tasks = require('./tasks');

var tasks = _interopRequire(_tasks);

var options = undefined;

var runTaskWithOptions = function runTaskWithOptions(options, task, name) {
  return function (cb) {
    var taskOptions = options.tasks[name];

    if (!taskOptions) {
      return cb('No options found for task "' + name + '".');
    }

    if (!taskOptions.enabled) {
      //log.disabledTask(name);
      return cb();
    }

    taskOptions.taskName = name;

    log.startTask(name);

    task.run(taskOptions, function (e) {
      if (e) {
        return cb(e);
      }

      log.finishTask(name);

      cb();
    });
  };
};

module.exports = function (_x, cb) {
  var inputOptions = arguments[0] === undefined ? {} : arguments[0];

  options = global.options = parseOptions(defaultOptions, inputOptions);

  if (options.logging) {
    minilog.suggest.deny(/.*/, options.logging.level);
  }

  var autoTasks = _.reduce(tasks, function (m, v, k) {
    m[k] = v.dependencies.concat(runTaskWithOptions(options, v, k));

    return m;
  }, {});

  _auto.auto(autoTasks, cb);
};

;