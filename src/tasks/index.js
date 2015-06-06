'use strict';

import logging from '../lib/logging';

import clean from './clean';
import compileBabel from './compileBabel';
import compileBrowserify from './compileBrowserify';
import compileCoffeescript from './compileCoffeescript';
import compileCopy from './compileCopy';
import compileLess from './compileLess';
import compileLivescript from './compileLivescript';
import compileStylus from './compileStylus';
import compileWebpack from './compileWebpack';
import runBrowsersyncServer from './runBrowsersyncServer';
import runServers from './runServers';
import runTests from './runTests';
import watch from './watch';
import watchBabel from './watchBabel';
import watchBrowserify from './watchBrowserify';
import watchBrowsersync from './watchBrowsersync';
import watchCoffeescript from './watchCoffeescript';
import watchCopy from './watchCopy';
import watchLess from './watchLess';
import watchLivescript from './watchLivescript';
import watchServers from './watchServers';
import watchStylus from './watchStylus';
import watchTests from './watchTests';
import watchWebpack from './watchWebpack';

export default {
  clean,
  compileBabel,
  compileBrowserify,
  compileCoffeescript,
  compileCopy,
  compileLess,
  compileLivescript,
  compileStylus,
  compileWebpack,
  runBrowsersyncServer,
  runServers,
  runTests,
  watch,
  watchBabel,
  watchBrowserify,
  watchBrowsersync,
  watchCoffeescript,
  watchCopy,
  watchLess,
  watchLivescript,
  watchServers,
  watchStylus,
  watchTests,
  watchWebpack
};
