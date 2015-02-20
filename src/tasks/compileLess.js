'use strict';

import { compileAllFiles } from '../lib/less';

export const dependencies = [ 'clean' ];

export const run = compileAllFiles;
