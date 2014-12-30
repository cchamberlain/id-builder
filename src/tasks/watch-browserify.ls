require! <[
  async
  id-debug
  prelude-ls
]>

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

export dependencies = <[
  runTests
]>

export run = (options, cb) !->
  cb null
