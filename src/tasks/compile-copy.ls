require! <[
  async
  id-debug
  prelude-ls
]>

copy = require "../lib/copy"

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
  error <-! copy.copy-all-files options

  return cb error if error

  cb!
