'use strict';

import { compileAllFiles } from '../lib/stylus';

export const dependencies = [ 'runTests' ];

export const run = compileAllFiles
