require! <[
  async
  prelude-ls
]>

livescript = require "../lib/livescript"

{
  each
  map
} = prelude-ls

export dependencies = [ "clean" ]

export run = (options, cb) !->
  error <-! livescript.compile-all-files options

  return cb error if error

  cb!
