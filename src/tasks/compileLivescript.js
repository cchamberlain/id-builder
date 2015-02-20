'use strict';

import { compileAllFiles } from '../lib/livescript';

export const dependencies = [ 'clean' ];

export const run = compileAllFiles
