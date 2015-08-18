import chalk from 'chalk';
import log from 'loglevel';

const arrowCharacter = '→';
const okCharacter = '✓';
const warningCharacter = '✗';

function taskInfo(task, message) {
  log.info(`  ${task} ${chalk.grey(message)}`);
}

function taskWarn(task, message) {
  log.warn(`${chalk.orange(arrowCharacter)} ${task}: ${message}`);
}

function taskError(task, message) {
  log.error(`${chalk.red(arrowCharacter)} ${task}: ${message}`);
}

function disabledTask(name) {
  log.warn(`${chalk.yellow(warningCharacter)} ${name}`);
}

function startTask(name) {
  log.info(`${chalk.grey(arrowCharacter)} ${name}`);
}

function skipTask(name) {
  log.info(`${chalk.grey(okCharacter)} ${name}`);
}

function finishTask(name) {
  log.info(`${chalk.green(okCharacter)} ${chalk.green(name)}`);
}

export default {
  arrowCharacter,
  okCharacter,
  warningCharacter,

  taskInfo,
  taskWarn,
  taskError,
  disabledTask,
  startTask,
  skipTask,
  finishTask
};
