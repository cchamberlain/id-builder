'use strict';

import clean from './clean';
import compileBabel from './compileBabel';
import compileBrowserify from './compileBrowserify';
import compileCoffeescript from './compileCoffeescript';
import compileCopy from './compileCopy';
import compileJade from './compileJade';
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
import watchJade from './watchJade';
import watchLess from './watchLess';
import watchLivescript from './watchLivescript';
import watchServers from './watchServers';
import watchStylus from './watchStylus';
import watchTests from './watchTests';

export default {
  clean: clean,
  compileBabel: compileBabel,
  compileBrowserify: compileBrowserify,
  compileCoffeescript: compileCoffeescript,
  compileCopy: compileCopy,
  compileJade: compileJade,
  compileLess: compileLess,
  compileLivescript: compileLivescript,
  compileStylus: compileStylus,
  runBrowsersyncServer: runBrowsersyncServer,
  runServers: runServers,
  runTests: runTests,
  watch: watch,
  watchBabel: watchBabel,
  watchBrowserify: watchBrowserify,
  watchBrowsersync: watchBrowsersync,
  watchCoffeescript: watchCoffeescript,
  watchCopy: watchCopy,
  watchJade: watchJade,
  watchLess: watchLess,
  watchLivescript: watchLivescript,
  watchServers: watchServers,
  watchStylus: watchStylus,
  watchTests: watchTests
};
