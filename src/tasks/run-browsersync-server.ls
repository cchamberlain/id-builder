require! <[
  browser-sync
  id-debug
]>

browsersync = require "../lib/browsersync"

{
  debug
  error
  info
  warning
} = id-debug

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
