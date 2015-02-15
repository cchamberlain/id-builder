'use strict';

const moment = require('moment');

const getDate = function(){
  return moment().format();
};

const info = function(message){
  console.log(getDate() + ' ' + message);
};

const warn = function(message){
  console.log(getDate() + ' ' + message);
};

const error = function(message){
  console.log(getDate() + ' error   ' + message);
};

const taskInfo = function(task, message){
  info(task + ': ' + message);
};

const taskWarn = function(task, message){
  info(task + ': ' + message);
};

const taskError = function(task, message){
  info(task + ': ' + message);
};

const disabledTask = function(name){
  return info(name + ': Disabled');
};

const startTask = function(name){
  return info(name + ': Start');
};

const finishTask = function(name){
  return info(name + ': Finish');
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