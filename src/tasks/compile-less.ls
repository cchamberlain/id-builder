require! <[
  async
  prelude-ls
]>

less = require "../lib/less"

{
  each
  map
} = prelude-ls

export dependencies = [ "clean" ]

export run = (options, cb) !->
  error <-! less.compile-all-files options

  return cb error if error

  cb!
