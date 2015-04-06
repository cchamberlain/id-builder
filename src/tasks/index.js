'use strict';

import log from 'loglevel';
import clean from './clean';
import compileBabel from './compileBabel';
import compileBrowserify from './compileBrowserify';
import compileCoffeescript from './compileCoffeescript';
import compileCopy from './compileCopy';
import compileLess from './compileLess';
import compileLivescript from './compileLivescript';
import compileStylus from './compileStylus';
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

export default {
  clean,
  compileBabel,
  compileBrowserify,
  compileCoffeescript,
  compileCopy,
  compileLess,
  compileLivescript,
  compileStylus,
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
  watchTests
};
