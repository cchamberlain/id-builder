import { readFile, writeFile } from 'fs';
import { dirname } from 'path';

import _ from 'lodash';
import lsr from 'lsr';
import mkdirp from 'mkdirp';
import { each } from 'async';

import Task from './Task';
import logging from '../lib/logging';

class CompileTask extends Task {
  constructor(options = {}) {
    super(options);

    this.sourceFileExtension = options.sourceFileExtension;
    this.targetFileExtension = options.targetFileExtension;
    this.sourceDirectoryPath = options.sourceDirectoryPath;
    this.targetDirectoryPath = options.targetDirectoryPath;
  }

  get sourceFilePathMatchExpression() {
    return new RegExp(`^${this.sourceDirectoryPath}.+\\.${this.sourceFileExtension}$`);
  }

  sourceFilePathMatches(sourceFilePath) {
    return !!sourceFilePath.match(this.sourceFilePathMatchExpression);
  }

  get targetPathReplaceExpression() {
    return new RegExp(`\\.${this.sourceFileExtension}$`);
  }

  getTargetPath(sourceFilePath) {
    return sourceFilePath
      .replace(this.sourceDirectoryPath, this.targetDirectoryPath)
      .replace(this.targetPathReplaceExpression, `.${this.targetFileExtension}`);
  }

  getFiles(path, cb) {
    lsr(path, (e, nodes) => {
      if (e) {
        return cb(e);
      }

      const filteredNodes = _.filter(nodes, v => {
        if (v.isFile()) {
          return v;
        }
      });

      cb(null, filteredNodes);
    });
  }

  ensureFileDirectory(targetFilePath, cb) {
    mkdirp(dirname(targetFilePath), cb);
  }

  // Reference implementation. Just returns the chunk.
  compileChunk(chunk, cb) {
    cb(null, chunk);
  }

  compileFile(sourceFilePath, targetFilePath, cb) {
    readFile(sourceFilePath, (e, fileContent) => {
      if (e) {
        return cb(e);
      }

      this.compileChunk(fileContent.toString(), (e, compiledChunk) => {
        if (e) {
          logging.taskWarn(this.constructor.name, `${sourceFilePath}: ${e}`);
          return cb();
        }

        this.ensureFileDirectory(targetFilePath, e => {
          if (e) {
            return cb(e);
          }

          writeFile(targetFilePath, compiledChunk, e => {
            if (e) {
              return cb(e);
            }

            logging.taskInfo(this.constructor.name, `${sourceFilePath} => ${targetFilePath}`);

            cb(null);
          });
        });
      });
    });
  }

  compileAllFiles(cb) {
    this.getFiles(this.sourceDirectoryPath, (e, sourceFilePaths) => {
      if (e) {
        return cb(e);
      }

      const paths = _(sourceFilePaths)
        .map(v => v.fullPath)
        .filter(this.sourceFilePathMatches.bind(this))
        .value();

      each(paths, (currentSourceFilePath, cb) => {
        this.compileFile(currentSourceFilePath, this.getTargetPath(currentSourceFilePath), cb);
      }, cb);
    });
  }
}

export default CompileTask;
