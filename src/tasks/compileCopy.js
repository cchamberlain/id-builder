'use strict';

import { copyAllFiles } from '../lib/copy';

export const dependencies = [ 'clean' ];

export const run = copyAllFiles
