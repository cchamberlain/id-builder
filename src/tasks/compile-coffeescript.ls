require! <[
  async
  id-debug
  prelude-ls
]>

coffeescript = require "../lib/coffeescript"

{
  debug
  error
  info
  warning
} = id-debug

{
  each
  map
} = prelude-ls

export dependencies = [ "clean" ]

export run = (options, cb) !->
  error <-! coffeescript.compile-all-files options

  return cb error if error

  cb!
