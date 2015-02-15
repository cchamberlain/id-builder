"use strict";

var moment = require("moment");

var getDate = function () {
  return moment().format();
};

var info = function (message) {
  console.log(getDate() + " " + message);
};

var warn = function (message) {
  console.log(getDate() + " " + message);
};

var error = function (message) {
  console.log(getDate() + " error   " + message);
};

var taskInfo = function (task, message) {
  info(task + ": " + message);
};

var taskWarn = function (task, message) {
  info(task + ": " + message);
};

var taskError = function (task, message) {
  info(task + ": " + message);
};

var disabledTask = function (name) {
  return info(name + ": Disabled");
};

var startTask = function (name) {
  return info(name + ": Start");
};

var finishTask = function (name) {
  return info(name + ": Finish");
};

module.exports = {
  getDate: getDate,
  info: info,
  warn: warn,
  error: error,
  taskInfo: taskInfo,
  taskWarn: taskWarn,
  taskError: taskError,
  disabledTask: disabledTask,
  startTask: startTask,
  finishTask: finishTask
};