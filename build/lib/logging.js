"use strict";

var moment = require("moment");

var getDate = exports.getDate = function () {
  return moment().format();
};

var info = exports.info = function (message) {
  console.log(getDate() + " " + message);
};

var warn = exports.warn = function (message) {
  console.log(getDate() + " " + message);
};

var error = exports.error = function (message) {
  console.log(getDate() + " error   " + message);
};

var taskInfo = exports.taskInfo = function (task, message) {
  info(task + ": " + message);
};

var taskWarn = exports.taskWarn = function (task, message) {
  info(task + ": " + message);
};

var taskError = exports.taskError = function (task, message) {
  info(task + ": " + message);
};

var disabledTask = exports.disabledTask = function (name) {
  return info(name + ": Disabled");
};

var startTask = exports.startTask = function (name) {
  return info(name + ": Start");
};

var finishTask = exports.finishTask = function (name) {
  return info(name + ": Finish");
};
Object.defineProperty(exports, "__esModule", {
  value: true
});