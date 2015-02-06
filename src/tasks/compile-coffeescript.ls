require! <[
  async
  prelude-ls
]>

coffeescript = require "../lib/coffeescript"

{
  each
  map
} = prelude-ls

export dependencies = [ "clean" ]

export run = (options, cb) !->
  error <-! coffeescript.compile-all-files options

  return cb error if error

  cb!
