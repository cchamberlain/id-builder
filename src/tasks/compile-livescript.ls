require! <[
  async
  id-debug
  prelude-ls
]>

livescript = require "../lib/livescript"

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
  error <-! livescript.compile-all-files options

  return cb error if error

  cb!
