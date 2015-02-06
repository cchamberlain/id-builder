require! <[
  async
  prelude-ls
]>

copy = require "../lib/copy"

{
  each
  map
} = prelude-ls

export dependencies = [ "clean" ]

export run = (options, cb) !->
  error <-! copy.copy-all-files options

  return cb error if error

  cb!
