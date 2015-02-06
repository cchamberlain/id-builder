require! <[
  browser-sync
]>

browsersync = require "../lib/browsersync"

export dependencies = <[
  compileBrowserify
  compileCoffeescript
  compileCopy
  compileJade
  compileLess
  compileLivescript
  compileStylus
]>

export run = (options, cb) !->
  browsersync.run-server options, cb
