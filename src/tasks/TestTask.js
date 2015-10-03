import fs from 'fs';
import path from 'path';
import vm from 'vm';

import _ from 'lodash';
import log from 'loglevel';
import tapSpec from 'tap-spec';
import tape from 'tape';

import Task from '../lib/Task';
import getFiles from '../lib/getFiles';

class TestTask extends Task {
  constructor(options = {}) {
    super(options);

    this.sourceDirectoryPaths = options.sourceDirectoryPaths;

    /*
    this.tapeStream = tape.createStream();
    this.tapeFormatStream = tapSpec();

    this.tapeStream
      .pipe(this.tapeFormatStream)
      .pipe(process.stdout);
    */
  }

  // TODO: refactor lambda's to methods.
  run() {
    log.debug(`TestTask#run`);

    const promises = _(this.sourceDirectoryPaths)
      .map(directoryPath => {
        return new Promise((resolve, reject) => {
           getFiles(directoryPath, (e, files) => {
             if (e) {
               return reject(e);
             }

             const javascriptFiles = _(files)
               .filter(v => v.path.match(/.js$/) && v)
               .value();

             resolve(javascriptFiles);
           });
        })
      })
      .value();

    Promise.all(promises)
      .then(files => {
        const flattenedFiles = _(files)
          .flatten()
          .value();

        _.each(flattenedFiles, file => {
          const fullPath = path.resolve(`./${file.fullPath}`);

          fs.readFile(fullPath, (e, content) => {
            if (e) {
              throw e;
            }

            const fn = eval(content.toString());

            if (fn) {
              fn();
            }
          });
        });
      })
      .catch(error => {
        log.error(error.stack || error.message || error);
      });
  }
}

export default TestTask;
