require! <[
  jade
  async
]>

file-system = require "./file-system"
logging     = require "./logging"

export source-extension = "jade"
export target-extension = "js"

export source-file-path-matches = (options, source-file-path) -->
  source-file-path.match //^#{options.source-path}.+\.#{source-extension}$//

export compile-chunk = (options, cb) !->
  try
    cb null, jade.compile-client chunk,
      compile-debug: false
      filename:      source-file-path

  catch error
    return cb error

export compile-file = file-system.compile-file compile-chunk

export compile-all-files = file-system.compile-all-files source-file-path-matches, compile-file, source-extension, target-extension