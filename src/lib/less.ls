require! <[
  less
  async
  id-debug
]>

{
  debug
  error
  info
  warning
} = id-debug

file-system = require "./file-system"
logging     = require "./logging"

export source-extension = "less"
export target-extension = "css"

export source-file-path-matches = (options, source-file-path) -->
  source-file-path.match //^#{options.source-path}.+\.#{source-extension}$//

export compile-chunk = (options, chunk, cb) !->
  less.render chunk, cb

export compile-file = file-system.compile-file compile-chunk

export compile-all-files = file-system.compile-all-files source-file-path-matches, compile-file, source-extension, target-extension
