import _ from 'lodash';
import browserSync from 'browser-sync';
import chokidar from 'chokidar';
import log from 'loglevel';

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

  _handleChangeBrowsersync(path) {
    const browserSyncTask = this.getBrowserSyncTask();

    browserSyncTask.reload(path);
  }

  _handleChangeCompileTask(path, compileTask) {
    const targetPath = compileTask.getTargetPath(path);

    compileTask.compileFile(path, targetPath, (e) => {
      if (e) {
        return logError(e);
      }
    });
  }

  _handleChangeTestTask(path) {
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
  }

  _handleChangeServerTask(path) {
    const serverTask = this.getServerTaskForPath(path);

    if (serverTask) {
      serverTask.restartServer(path, (e) => {
        if (e) {
          return logError(e);
        }
      });
    }
  }

  _handleChange(path) {
    this._handleChangeBrowsersync(path);

    let compileTask = this.getCompilerTaskForPath(path);

    if (compileTask) {
      this._handleChangeCompileTask(path, compileTask);
    } else {
      this._handleChangeTestTask(path);
      this._handleChangeServerTask(path);
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

  getBrowserSyncTask() {
    // TODO: Is this horrible?
    return this.builder.taskInstances.BrowserSyncServerTask;
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
