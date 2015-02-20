'use strict';

import { compileAllFiles } from '../lib/stylus';

export const dependencies = [ 'clean' ];

export const run = compileAllFiles
