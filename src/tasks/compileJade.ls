require! <[
  async
  prelude-ls
]>

jade = require "../lib/jade"

{
  each
  map
} = prelude-ls

export dependencies = [ "clean" ]

export run = (options, cb) !->
  error <-! jade.compile-all-files options

  return cb error if error

  cb!
