import  { readFile } from 'fs';

import _ from 'lodash';
import { each } from 'async'
import { transform } from 'babel';
import circularJSON from 'circular-json';

import Task from '../lib/Task';
import logging from '../lib/logging';

let DERP = true;

/**
 * Constructs a PlantUML version of all classes fed to the compiler and puts
 * them into one diagram. Only supports a very specific subset of ES6
 * functionality;
 *  - Every module included in the graph contains one class.
 *  - Class names are unique (for now).
 */
class PlantUMLCompile extends Task {
  constructor(options = {}) {
    super(options);

    // Stores all classes to be used in the PlantUML output.
    this.classes = {};
  }

  run(cb) {
    cb();
  }
}

export default PlantUMLCompile;
