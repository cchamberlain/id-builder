require! <[ stylus ]>

file = require "../../lib/file"

export compile-chunk = stylus.render

export compile-file = file.compile-file compile-chunk

export compile-all-files = file.compile-all-files compile-file, "styl", "css"
