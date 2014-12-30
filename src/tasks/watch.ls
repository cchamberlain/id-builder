watch = require "../lib/watch"

export dependencies = <[
  runTests
]>

export run = (options, cb) !->
  watch.start options
  cb!
