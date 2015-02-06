require! <[
  async
  prelude-ls
]>

tests = require "../lib/tests"

{
  each
  map
} = prelude-ls

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
  tests.run-tests options, cb
