"use strict";

let moment = require("moment");

let getDate = function(){
  return moment().format();
};

let info = function(message){
  console.log(getDate() + " " + message);
};

let warn = function(message){
  console.log(getDate() + " " + message);
};

let error = function(message){
  console.log(getDate() + " error   " + message);
};

let taskInfo = function(task, message){
  info(task + ": " + message);
};

let taskWarn = function(task, message){
  info(task + ": " + message);
};

let taskError = function(task, message){
  info(task + ": " + message);
};

let disabledTask = function(name){
  return info(name + ": Disabled");
};

let startTask = function(name){
  return info(name + ": Start");
};

let finishTask = function(name){
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