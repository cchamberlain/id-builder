import { readFile, writeFile } from 'fs';

import lsr from 'lsr';
import { each } from 'async';

import Task from '../lib/Task';
import copy from '../lib/copy';
import fileSystem from '../lib/fileSystem';

class Copy extends Task {
  constructor(options = {}) {
    super(options);

    this.dependencies = ['DirectoryCleaner'];
  }

  sourceFilePathMatches() {
  }

  getPaths(options, cb) {
    lsr(options.sourceDirectoryPath, (e, nodes) => {
      if (e) {
        return cb(e);
      }

      const paths = _(nodes)
        .filter(v => !v.isDirectory() && copy.sourceFilePathMatches(options, v.fullPath))
        .map(v => v.fullPath)
        .value();

      cb(null, paths);
    });
  }

  copyFile(options, sourceFilePath, targetFilePath, cb) {
    readFile(sourceFilePath, (e, readChunk) => {
      if (e) {
        return cb(e);
      }

      fileSystem.ensureFileDirectory(targetFilePath, e => {
        if (e) {
          return cb(e);
        }

        writeFile(targetFilePath, readChunk, e => {
          if (e) {
            return cb(e);
          }

          cb(null);
        });
      });
    });
  }

  run(options, cb) {
    this.getPaths(options, (e, paths) => {
      if (e) {
        return cb(e);
      }

      const iteratePath = (currentSourceDirectoryPath, cb) => {
        const currentTargetDirectoryPath = currentSourceDirectoryPath.replace(options.sourceDirectoryPath, options.targetDirectoryPath);

        this.copyFile(options, currentSourceDirectoryPath, currentTargetDirectoryPath, cb);
      };

      each(paths, iteratePath, cb);
    });
  }
}

export default Copy;
