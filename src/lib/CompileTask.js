import { readFile, writeFile } from 'fs';
import { dirname } from 'path';

import _ from 'lodash';
import log from 'loglevel';
import mkdirp from 'mkdirp';
import { each } from 'async';

import Compiler from './Compiler';
import Task from './Task';
import logging from '../lib/logging';
import getFiles from '../lib/getFiles';

class CompileTask extends Task {
  constructor(options = {}) {
    super(options);

    this.sourceFileExtension = options.sourceFileExtension;
    this.targetFileExtension = options.targetFileExtension;
    this.sourceDirectoryPath = options.sourceDirectoryPath;
    this.targetDirectoryPath = options.targetDirectoryPath;

    this.setCompiler(Compiler);
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

  ensureFileDirectory(targetFilePath, cb) {
    mkdirp(dirname(targetFilePath), cb);
  }

  compileFile(sourceFilePath, targetFilePath, cb) {
    readFile(sourceFilePath, (e, fileContent) => {
      if (e) {
        return cb(e);
      }

      if (!this.compiler.compileChunk) {
        console.log(this.compiler.constructor.name);

        console.trace();
      }

      this.compiler.compileChunk(fileContent.toString(), sourceFilePath)
        .then(compiledChunk => {
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
        })
        .catch(e => {
          logging.taskWarn(this.constructor.name, `${sourceFilePath}: ${e.stack || e.message || e}`);
          return cb();
        });
    });
  }

  compileAllFiles(cb) {
    getFiles(this.sourceDirectoryPath, (e, sourceFilePaths) => {
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

  setCompiler(CompilerClass) {
    // First remove the currently set compiler from the builder.
    if (this.compiler) {
      this.builder.removeCompiler(this.compiler);
    }

    // Then set the the new compiler
    this.compiler = new CompilerClass(this.options.compiler);

    // And add it to the builder
    this.builder.addCompiler(this.compiler);
  }
}

export default CompileTask;
