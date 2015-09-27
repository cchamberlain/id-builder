import browserSync from 'browser-sync';

import logging from '../lib/logging';
import Task from '../lib/Task';

class BrowserSyncServerTask extends Task {
  reload(options, path, cb) {
    browserSync.reload(path);

    logging.taskInfo(this.constructor.name, `Reloaded \`${path}\``);

    cb();
  }

  run(cb) {
    browserSync(this.options.options, (e) => {
      if (e) {
        return cb(e);
      }

      logging.taskInfo(this.constructor.name, `API Server running at 127.0.0.1:${this.options.options.port}`);
      logging.taskInfo(this.constructor.name, `HTTP Server running at 127.0.0.1:${this.options.options.ui.port}`);

      // cb();
    });
  }
}

export default BrowserSyncServerTask;
