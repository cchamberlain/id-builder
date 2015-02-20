'use strict';

import { compileAllFiles } from '../lib/fileSystem';

export const dependencies = [ 'clean' ];

export const run = compileAllFiles
