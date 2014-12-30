require! <[
  async
  id-debug
  prelude-ls
]>

less = require "../lib/less"

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
  error <-! less.compile-all-files options

  return cb error if error

  cb!
