"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var minilog = _interopRequire(require("minilog"));

var _ = _interopRequire(require("lodash"));

var auto = require("async").auto;

var moment = _interopRequire(require("moment"));

var log = _interopRequireWildcard(require("./lib/log"));

var defaultOptions = _interopRequire(require("./lib/defaultOptions"));

var parseOptions = _interopRequire(require("./lib/parseOptions"));

var tasks = _interopRequire(require("./tasks"));

var options = undefined;

var runTaskWithOptions = function runTaskWithOptions(options, task, name) {
  return function (cb) {
    var taskOptions = options.tasks[name];

    if (!taskOptions) {
      return cb("No options found for task \"" + name + "\".");
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

  auto(autoTasks, cb);
};