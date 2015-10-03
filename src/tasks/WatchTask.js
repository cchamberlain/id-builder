// Get browserify watch working with my own watcher.
// Ask browserify if a file matches to re-bundle

import _ from 'lodash';
import chokidar from 'chokidar';
import log from 'loglevel';
// import { each } from 'async';
// import { noop } from 'lodash';

import CompileTask from '../lib/CompileTask';
import Task from '../lib/Task';

function logError(error) {
  log.error(error.stack || error.message || error);
}

class WatchTask extends Task {
  constructor(options = {}) {
    log.debug('WatchTask#constructor');

    super(options);

    this.watcher = null;
    this.compilers = null;

    _.bindAll(this, [
      '_handleAdd',
      '_handleAddDir',
      '_handleChange',
      '_handleUnlink',
      '_handleUnlinkDir',
      '_handleError'
    ]);
  }

  _handleAdd(path) {
    log.debug('WatchTask#_handleAdd', path);
  }

  _handleAddDir(path) {
    log.debug('WatchTask#_handleAddDir', path);
  }

  _handleChange(path) {
    let compileTask = this.getCompilerTaskForPath(path);

    if (compileTask) {
      const targetPath = compileTask.getTargetPath(path);

      compileTask.compileFile(path, targetPath, (e) => {
        if (e) {
          return logError(e);
        }
      });
    } else {
      const testTask = this.getTestTask();

      if (testTask) {
        const shouldReload = !!_(testTask.watchDirectoryPaths)
          .filter(directoryPath => {
            if (_.startsWith(path, directoryPath)) {
              return true;
            }
          })
          .value()
          .length;

        if (shouldReload) {
          testTask.runTests(error => {
            if (error) {
              return logError(error);
            }
          });
        }
      }

      const serverTask = this.getServerTaskForPath(path);

      if (serverTask) {
        serverTask.restartServer(path, (e) => {
          if (e) {
            return logError(e);
          }
        });
      }
    }
  }

  _handleUnlink(path) {
    log.debug('WatchTask#_handleUnlink', path);
  }

  _handleUnlinkDir(path) {
    log.debug('WatchTask#_handleUnlinkDir', path);
  }

  _handleError(error) {
    log.debug('WatchTask#_handleError', error);
  }

  getCompilerTasks() {
    return _(this.builder.taskInstances)
      .filter(v => {
        return v instanceof CompileTask;
      })
      .value();
  }

  getTestTask() {
    // TODO: Is this horrible?
    return this.builder.taskInstances.TestTask;
  }

  getServerTask() {
    // TODO: Is this horrible?
    return this.builder.taskInstances.ServerTask;
  }

  getCompilerTaskForPath(path) {
    const compilerTasks = this.getCompilerTasks();

    return _.find(compilerTasks, task => {
      return task.sourceFilePathMatches(path);
    });
  }

  getServerTaskForPath(path) {
    const serverTask = this.getServerTask();

    if (serverTask.sourceFilePathMatches(path)) {
      return serverTask;
    }
  }

  setWatcher() {
    this.watcher = chokidar.watch(this.options.paths, {
      atomic: true,
      ignoreInitial: true,
      // ignored: /[\/\/]\./,
      persistent: true,
      usePolling: true
    });
  }

  setEventHandlers() {
    this.watcher.on('add', this._handleAdd);
    this.watcher.on('addDir', this._handleAddDir);
    this.watcher.on('change', this._handleChange);
    this.watcher.on('unlink', this._handleUnlink);
    this.watcher.on('unlinkDir', this._handleUnlinkDir);
    this.watcher.on('error', this._handleError);
  }

  run() {
    this.setWatcher();
    this.setEventHandlers();
  }
}

export default WatchTask;
