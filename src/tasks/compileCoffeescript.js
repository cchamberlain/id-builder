'use strict';

import log from 'loglevel';
import { compileAllFiles } from '../lib/coffeescript';

export const dependencies = [ 'clean' ];

export const run = compileAllFiles;
