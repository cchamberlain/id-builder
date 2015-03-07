'use strict';

import log from 'loglevel';
import { compileAllFiles } from '../lib/jade';

export const dependencies = [ 'clean' ];

export const run = compileAllFiles;
