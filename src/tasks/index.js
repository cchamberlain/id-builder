'use strict';

import * as clean from './clean';
import * as compileBabel from './compileBabel';
import * as compileBrowserify from './compileBrowserify';
import * as compileCoffeescript from './compileCoffeescript';
import * as compileCopy from './compileCopy';
import * as compileJade from './compileJade';
import * as compileLess from './compileLess';
import * as compileLivescript from './compileLivescript';
import * as compileStylus from './compileStylus';
import * as runBrowsersyncServer from './runBrowsersyncServer';
import * as runServers from './runServers';
import * as runTests from './runTests';
import * as watch from './watch';
import * as watchBabel from './watchBabel';
import * as watchBrowserify from './watchBrowserify';
import * as watchBrowsersync from './watchBrowsersync';
import * as watchCoffeescript from './watchCoffeescript';
import * as watchCopy from './watchCopy';
import * as watchJade from './watchJade';
import * as watchLess from './watchLess';
import * as watchLivescript from './watchLivescript';
import * as watchServers from './watchServers';
import * as watchStylus from './watchStylus';
import * as watchTests from './watchTests';

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
