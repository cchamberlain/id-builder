require! <[
  less
  async
]>

file-system = require "./fileSystem"
logging     = require "./logging"

export source-extension = "less"
export target-extension = "css"

export source-file-path-matches = (options, source-file-path) -->
  source-file-path.match //^#{options.source-path}.+\.#{source-extension}$//

export compile-chunk = (options, chunk, cb) !->
  error, { css } <-! less.render chunk

  cb error, css

export compile-file = file-system.compile-file compile-chunk

export compile-all-files = file-system.compile-all-files source-file-path-matches, compile-file, source-extension, target-extension
