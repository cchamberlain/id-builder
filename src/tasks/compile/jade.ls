require! <[ jade ]>

file = require "../../lib/file"

export compile-chunk = (chunk, cb) !->
  try
    cb null, jade.compile-client chunk,
      compile-debug: false

  catch error
    return cb error

export compile-file = file.compile-file compile-chunk

export compile-all-files = file.compile-all-files compile-file, "jade", "js"
