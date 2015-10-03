import _ from 'lodash';
import browserSync from 'browser-sync';
import log from 'loglevel';

import logging from '../lib/logging';
import Task from '../lib/Task';

class BrowserSyncServerTask extends Task {
  constructor(options = {}) {
    super(options);

    this.paths = options.paths;
  }

  reload(path) {
    const shouldReload = !!_(this.paths)
      .filter(directoryPath => {
        if (_.startsWith(path, directoryPath)) {
          return true;
        }
      })
      .value()
      .length;

    if (shouldReload) {
      browserSync.reload(path);

      logging.taskInfo(this.constructor.name, `Reloaded \`${path}\``);
    }
  }

  run(cb) {
    log.debug(`BrowserSyncServerTask#run`);

    browserSync(this.options.options, (e) => {
      if (e) {
        return cb(e);
      }

      logging.taskInfo(this.constructor.name, `API Server running at 127.0.0.1:${this.options.options.port}`);
      logging.taskInfo(this.constructor.name, `HTTP Server running at 127.0.0.1:${this.options.options.ui.port}`);
    });
  }
}

export default BrowserSyncServerTask;
