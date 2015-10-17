import  { readFile } from 'fs';

import _ from 'lodash';
import { each } from 'async'
import { transform } from 'babel';
import circularJSON from 'circular-json';

import CompileTask from '../lib/CompileTask';
import logging from '../lib/logging';
import getFiles from '../lib/getFiles';

let DERP = true;

/**
 * Constructs a PlantUML version of all classes fed to the compiler and puts
 * them into one diagram. Only supports a very specific subset of ES6
 * functionality;
 *  - Every module included in the graph contains one class.
 *  - Class names are unique (for now).
 */
class PlantUMLCompile extends CompileTask {
  constructor(options = {}) {
    super(options);

    // Stores all classes to be used in the PlantUML output.
    this.classes = {};
  }

  /**
   * Adds a class to the classes.
   * @param name
   */
  addClass(name) {
    this.classes[name] = {};
  }

  /**
   * Removes a class from the classes.
   * @param name
   */
  removeClass(name) {
    delete this.classes[name];
  }

  /**
   * Returns true if the AST contains a class token, otherwise it returns false.
   * @param {Object} ast
   * @returns {Boolean}
   */
  hasClass(ast) {
    return _.findWhere(ast.tokens, {
      value: 'class'
    });
  }

  /**
   * Returns true if the class extends another, otherwise it returns false.
   * @param ast
   * @returns {boolean}
   */
  doesClassExtend(ast) {
    return false;
  }

  /**
   * Returns the name of the parent class.
   * @param ast
   */
  getClassParent(ast) {
  }

  /**
   * Adds the parent class as parent to this one.
   * @param className
   * @param classParent
   */
  addClassParent(className, classParent) {
  }

  /**
   * Sets the parent of the class, if any.
   * @param className
   * @param ast
   */
  setClassParent(className, ast) {
    if (this.doesClassExtend(ast)) {
      const classExtendName = this.getClassParent(ast);

      this.addClassParent(className, classExtendName);
    }
  }

  /**
   * Sets the methods of the class, if any.
   * @param className
   * @param ast
   */
  setClassMethods(className, ast) {
  }

  /**
   * Returns the name of the class in the AST of a module.
   * @param ast
   */
  getClassName(ast) {
    logging.taskInfo(this.constructor.name, `getClassName ${ast}`);

    logging.taskInfo(this.constructor.name, `getClassName keys ${_.keys(ast)}`);
  }

  /**
   * Converts a chunk of ES6 code - containing a complete module - to a class.
   * in-memory model inside the instance.
   * @param chunk
   */
  convert(sourceFilePath, chunk) {
    const ast = transform(chunk, this.options.options).ast;

    if (this.hasClass(ast)) {
      if (DERP) {
        logging.taskInfo(this.constructor.name, `convert found class ${className}, ${sourceFilePath}`);
        logging.taskInfo(this.constructor.name, `AST: ${circularJSON.stringify(ast)}`);

        const className = this.getClassName(ast);

        this.addClass(className);

        this.setClassParent(className, ast);
        this.setClassMethods(className, ast);
        DERP = false;
      }
    }

    throw new Error('Not yet implemented');
  }

  compileChunk(sourceFilePath, chunk, cb) {
    try {
      cb(null, this.convert(sourceFilePath, chunk));
    } catch (e) {
      return cb(e);
    }
  }

  compileFile(sourceFilePath, cb) {
    logging.taskInfo(this.constructor.name, `compileFile ${sourceFilePath}`);

    readFile(sourceFilePath, (e, fileContent) => {
      if (e) {
        return cb(e);
      }

      this.compileChunk(sourceFilePath, fileContent.toString(), (e, compiledChunk) => {
        if (e) {
          logging.taskWarn(this.constructor.name, `${sourceFilePath}: ${e}`);

          return cb();
        }

        cb(null, compiledChunk);
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
        this.compileFile(currentSourceFilePath, cb);
      }, (e, results) => {
        if (e) {
          return cb(e);

          console.log('results', results.length);
        }
      });
    });
  }

  run(cb) {
    this.compileAllFiles(cb);
  }
}

export default PlantUMLCompile;
