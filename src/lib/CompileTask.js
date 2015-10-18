import fs from 'fs';
import path from 'path';

import _ from 'lodash';
import log from 'loglevel';
import mkdirp from 'mkdirp';
import async from 'async';

import Compiler from './Compiler';
import Task from './Task';
import getFiles from '../lib/getFiles';
import logging from '../lib/logging';
import promise from '../lib/promise';

/**
 * Compiles code from one language to another using a Compiler. May compile in
 * three ways:
 *  - Compiling a chunk (string) to another chunk.
 *  - Compiling a file from a source path to a target path.
 *  - Compiling a directory of files recursively from a source path to a target
 *    path, compiling all files that match.
 * @class CompileTask
 */
export default class CompileTask extends Task {
  constructor(options = {}) {
    super(options);

    this.sourceFileExtension = this.configuration.sourceFileExtension;
    this.targetFileExtension = this.configuration.targetFileExtension;
    this.sourceDirectoryPath = this.configuration.sourceDirectoryPath;
    this.targetDirectoryPath = this.configuration.targetDirectoryPath;
    this.compilerOptions = this.configuration.compiler;

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
   * TaskQueue but ensures only one Compiler per instance is active in the
   * TaskQueue.
   * TODO: Explain why it's a good thing to only have one compiler in the
   *       taskQueue per compile task.
   * TODO: Refactor: Move this to the TaskQueue class.
   * @param {Class} CompilerClass The compiler class used to compile chunks.
   * @returns CompileTask The instance.
   */
  setCompiler(CompilerClass) {
    // First remove the currently set compiler from the taskqueue.
    if (this.compiler) {
      this.taskQueue.removeCompiler(this.compiler);
    }

    // Then set the the new compiler
    this.compiler = new CompilerClass(this.compilerOptions);

    // And add it to the taskQueue
    this.taskQueue.addCompiler(this.compiler);

    return this;
  }

  /**
   * Ensures that a directory is available to write a file to. Creates all
   * parent directories of the file path.
   * @param {String} targetFilePath The target file path.
   */
  async ensureFileDirectory(targetFilePath) {
    await promise.promiseFromNodeCallback(mkdirp, path.dirname(targetFilePath));
  }

  /**
   * Reads a file from the `sourceFilePath`, compiles it using the set compiler
   * and writes it to the `targetFilePath`.
   * @param {String} sourceFilePath The source file path.
   * @param {String} targetFilePath The target file path.
   */
  async compileFile(sourceFilePath, targetFilePath) {
    const fileContent = await promise.promiseFromNodeCallback(fs.readFile, sourceFilePath);

    try {
      const compiledChunk = await this.compiler.compileChunk(fileContent.toString(), sourceFilePath)

      await this.ensureFileDirectory(targetFilePath);

      await promise.promiseFromNodeCallback(fs.writeFile, targetFilePath, compiledChunk);

      logging.taskInfo(this.constructor.name, `${sourceFilePath} => ${targetFilePath}`);
    } catch(error) {
      logging.taskWarn(this.constructor.name, `${sourceFilePath}: ${error.stack || error.message || error}`);
    }
  }

  /**
   * Compiles a directory of files recursively from a source path to a target
   * path, compiling all files that match.
   */
  async compileAllFiles() {
    const sourceFiles = await getFiles(this.sourceDirectoryPath);

    const matchingSourceFilePaths = _(sourceFiles)
      .map(v => v.fullPath)
      .filter(this.sourceFilePathMatches.bind(this))
      .value();

    const compileFilePromises = _.map(matchingSourceFilePaths, path => this.compileFile(path, this.getTargetPath(path)));

    await Promise.all(compileFilePromises);
  }

  /**
   * Runs the task.
   */
  async run() {
    await this.compileAllFiles();
  }
}
