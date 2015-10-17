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

/**
 * Compiles code from one language to another using a Compiler. May compile in
 * three ways:
 *  - Compiling a chunk (string) to another chunk.
 *  - Compiling a file from a source path to a target path.
 *  - Compiling a directory of files recursively from a source path to a target
 *    path, compiling all files that match.
 * @class CompileTask
 */
class CompileTask extends Task {
  constructor(options = {}) {
    super(options);

    this.sourceFileExtension = options.sourceFileExtension;
    this.targetFileExtension = options.targetFileExtension;
    this.sourceDirectoryPath = options.sourceDirectoryPath;
    this.targetDirectoryPath = options.targetDirectoryPath;

    this.setCompiler(Compiler);
  }

  /**
   * Returns the expression used by the `sourceFilePathMatches` method.
   * @return {RegExp} The regular expression.
   */
  get sourceFilePathMatchExpression() {
    return new RegExp(`^${this.sourceDirectoryPath}.+\\.${this.sourceFileExtension}$`);
  }

  /**
   * Returns `true` when a file path matches.
   * @param {String} sourceFilePath The source file path.
   * @return {boolean}
   */
  sourceFilePathMatches(sourceFilePath) {
    return !!sourceFilePath.match(this.sourceFilePathMatchExpression);
  }

  /**
   * Returns the expression used by the `getTargetPath` method.
   * @return {RegExp} The regular expression.
   */
  get targetPathReplaceExpression() {
    return new RegExp(`\\.${this.sourceFileExtension}$`);
  }

  /**
   * Gets the target file path for a source file path.
   * TODO: Rename to getTargetFilePath, because it is the path of a file.
   * @param {String} sourceFilePath The source file path.
   * @return {String} The target file path.
   */
  getTargetPath(sourceFilePath) {
    return sourceFilePath
      .replace(this.sourceDirectoryPath, this.targetDirectoryPath)
      .replace(this.targetPathReplaceExpression, `.${this.targetFileExtension}`);
  }

  /**
   * Sets the compiler used to compile chunks. Also adds the Compiler to the
   * Builder but ensures only one Compiler per instance is active in the
   * Builder.
   * TODO: Explain why it's a good thing to only have one compiler in the
   *       builder per compile task.
   * TODO: Refactor: Move this to the Builder class.
   * @param {Class} CompilerClass The compiler class used to compile chunks.
   * @returns CompileTask The instance.
   */
  setCompiler(CompilerClass) {
    // First remove the currently set compiler from the builder.
    if (this.compiler) {
      this.builder.removeCompiler(this.compiler);
    }

    // Then set the the new compiler
    this.compiler = new CompilerClass(this.options.compiler);

    // And add it to the builder
    this.builder.addCompiler(this.compiler);

    return this;
  }

  /**
   * Ensures that a directory is available to write a file to. Creates all
   * parent directories of the file path.
   * @param {String} targetFilePath The target file path.
   * @param {Function} cb The callback function.
   */
  ensureFileDirectory(targetFilePath, cb) {
    mkdirp(dirname(targetFilePath), cb);
  }

  /**
   * Reads a file from the `sourceFilePath`, compiles it using the set compiler
   * and writes it to the `targetFilePath`.
   * @param {String} sourceFilePath The source file path.
   * @param {String} targetFilePath The target file path.
   * @param {Function} cb The callback function.
   */
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

  /**
   * Compiles a directory of files recursively from a source path to a target
   * path, compiling all files that match.
   * @param {Function} cb The callback function.
   */
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
}

export default CompileTask;
