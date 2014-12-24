LiveScript = require "LiveScript"

{
  map
  filter
} = require "prelude-ls"

file = require "../../lib/file"

export compile-chunk = (chunk, cb) !->
  try
    cb null, LiveScript.compile chunk,
      bare: true

  catch error
    return cb error

export compile-file = file.compile-file compile-chunk

export compile-all-files = file.compile-all-files compile-file, "ls", "js"
