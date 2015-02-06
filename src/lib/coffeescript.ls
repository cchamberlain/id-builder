require! <[
  coffee-script
  async
]>

file-system = require "./fileSystem"
logging     = require "./logging"

export source-extension = "coffee"
export target-extension = "js"

export source-file-path-matches = (options, source-file-path) -->
  source-file-path.match //^#{options.source-path}.+\.#{source-extension}$//

export compile-chunk = (options, chunk, cb) !->
  try
    cb null, coffee-script.compile chunk,
      bare: true
  catch error
    return cb error

export compile-file = file-system.compile-file compile-chunk

export compile-all-files = file-system.compile-all-files source-file-path-matches, compile-file, source-extension, target-extension
