'use strict';

import log from 'loglevel';
import { compileAllFiles } from '../lib/stylus';

export const dependencies = [ 'clean' ];

export const run = compileAllFiles;
