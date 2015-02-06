require! <[
  async
  prelude-ls
]>

stylus = require "../lib/stylus"

{
  each
  map
} = prelude-ls

export dependencies = [ "clean" ]

export run = (options, cb) !->
  error <-! stylus.compile-all-files options

  return cb error if error

  cb!
