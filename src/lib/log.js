'use strict';

import moment from 'moment';

import chalk from 'chalk';
import minilog from 'minilog';

const log = minilog('id-builder');

minilog
  .pipe(minilog.suggest)
  .pipe(minilog.backends.console.formatLearnboost)
  .pipe(minilog.backends.console);

export const debug = function(...args) {
  log.debug(...args);
};

export const info = function(...args) {
  log.info(...args);
};

export const warn = function(...args) {
  log.warn(...args);
};

export const error = function(...args) {
  log.error(...args);
};


export const arrowCharacter = '→';
export const okCharacter = '✓';
export const warningCharacter = '✗';

export const taskInfo = function(task, message){
  info(`  ${task} ${chalk.grey(message)}`);
};

export const taskWarn = function(task, message){
  warn(`${chalk.grey(arrowCharacter)} ${task}: ${message}`);
};

export const taskError = function(task, message){
  error(`${chalk.grey(arrowCharacter)} ${task}: ${message}`);
};

export const disabledTask = function(name){
  warn(`${chalk.yellow(warningCharacter)} ${name}`);
};

export const startTask = function(name){
  info(`${chalk.grey(arrowCharacter)} ${name}`);
};

export const finishTask = function(name){
  info(`${chalk.green(okCharacter)} ${chalk.green(name)}`);
};
