'use strict';

import moment from 'moment';

import chalk from 'chalk';
import minilog from 'minilog';

const log = minilog('id-builder');

minilog
  .pipe(minilog.suggest)
  .pipe(minilog.backends.console.formatLearnboost)
  .pipe(minilog.backends.console);

const debug = function(...args) {
  log.debug(...args);
};

const info = function(...args) {
  log.info(...args);
};

const warn = function(...args) {
  log.warn(...args);
};

const error = function(...args) {
  log.error(...args);
};

const arrowCharacter = '→';
const okCharacter = '✓';
const warningCharacter = '✗';

const taskInfo = function(task, message){
  info(`  ${task} ${chalk.grey(message)}`);
};

const taskWarn = function(task, message){
  warn(`${chalk.grey(arrowCharacter)} ${task}: ${message}`);
};

const taskError = function(task, message){
  error(`${chalk.grey(arrowCharacter)} ${task}: ${message}`);
};

const disabledTask = function(name){
  warn(`${chalk.yellow(warningCharacter)} ${name}`);
};

const startTask = function(name){
  info(`${chalk.grey(arrowCharacter)} ${name}`);
};

const finishTask = function(name){
  info(`${chalk.green(okCharacter)} ${chalk.green(name)}`);
};

export default {
  debug,
  info,
  warn,
  error,
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
