'use strict';

import log from 'loglevel';
import { copyAllFiles } from '../lib/copy';

export const dependencies = [ 'clean' ];

export const run = copyAllFiles;
