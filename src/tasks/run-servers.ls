require! <[
  id-debug
]>

# TODO: before program exit clean up children.

servers = require "../lib/servers"

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
  servers.run-servers options, cb