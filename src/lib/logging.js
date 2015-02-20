'use strict';

const moment = require('moment');

export const getDate = function(){
  return moment().format();
};

export const info = function(message){
  console.log(getDate() + ' ' + message);
};

export const warn = function(message){
  console.log(getDate() + ' ' + message);
};

export const error = function(message){
  console.log(getDate() + ' error   ' + message);
};

export const taskInfo = function(task, message){
  info(task + ': ' + message);
};

export const taskWarn = function(task, message){
  info(task + ': ' + message);
};

export const taskError = function(task, message){
  info(task + ': ' + message);
};

export const disabledTask = function(name){
  return info(name + ': Disabled');
};

export const startTask = function(name){
  return info(name + ': Start');
};

export const finishTask = function(name){
  return info(name + ': Finish');
};
