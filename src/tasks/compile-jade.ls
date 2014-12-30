require! <[
  async
  id-debug
  prelude-ls
]>

jade = require "../lib/jade"

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
  error <-! jade.compile-all-files options

  return cb error if error

  cb!
