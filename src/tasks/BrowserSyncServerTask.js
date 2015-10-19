import _ from 'lodash';
import browserSyncServer from 'browser-sync';
import log from 'loglevel';

import Task from '../lib/Task';
import logging from '../lib/logging';
import promise from '../lib/promise';

class BrowserSyncServerTask extends Task {
  constructor(options = {}) {
    super(options);

    this.paths = this.configuration.paths;
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
      browserSyncServer.reload(path);

      logging.taskInfo(this.constructor.name, `Reloaded \`${path}\``);
    }
  }

  async run() {
    await promise.promiseFromNodeCallback(browserSyncServer, this.configuration.options);

    logging.taskInfo(this.constructor.name, `API Server running at 127.0.0.1:${this.configuration.options.port}`);
    logging.taskInfo(this.constructor.name, `HTTP Server running at 127.0.0.1:${this.configuration.options.ui.port}`);
  }
}

export default BrowserSyncServerTask;
