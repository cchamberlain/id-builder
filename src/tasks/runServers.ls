# TODO: before program exit clean up children.

servers = require "../lib/servers"

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
