'use strict';

import { compileAllFiles } from '../lib/babel';

export const dependencies = [ 'clean' ];

export const run = compileAllFiles;
