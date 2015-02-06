file-system = require "../lib/file-system"
browserify  = require "../lib/browserify"

export dependencies = <[
  clean
  compileCoffeescript
  compileJade
  compileLivescript
]>

export run = browserify.compile-all-files
