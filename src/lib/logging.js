'use strict';

import moment from 'moment';

import chalk from 'chalk';
import log from 'loglevel';

const arrowCharacter = '→';
const okCharacter = '✓';
const warningCharacter = '✗';

const taskInfo = function(task, message){
  log.info(`  ${task} ${chalk.grey(message)}`);
};

const taskWarn = function(task, message){
  log.warn(`${chalk.grey(arrowCharacter)} ${task}: ${message}`);
};

const taskError = function(task, message){
  log.error(`${chalk.grey(arrowCharacter)} ${task}: ${message}`);
};

const disabledTask = function(name){
  log.warn(`${chalk.yellow(warningCharacter)} ${name}`);
};

const startTask = function(name){
  log.info(`${chalk.grey(arrowCharacter)} ${name}`);
};

const finishTask = function(name){
  log.info(`${chalk.green(okCharacter)} ${chalk.green(name)}`);
};

export default {
  arrowCharacter,
  okCharacter,
  warningCharacter,

  taskInfo,
  taskWarn,
  taskError,
  disabledTask,
  startTask,
  finishTask
};
