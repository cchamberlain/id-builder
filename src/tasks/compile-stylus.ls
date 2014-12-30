require! <[
  async
  id-debug
  prelude-ls
]>

stylus = require "../lib/stylus"

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
  error <-! stylus.compile-all-files options

  return cb error if error

  cb!
