'use strict';

import log from 'loglevel';
import { watch } from '../lib/browserify';

export const dependencies = [ 'runTests' ];

export const run = watch;
