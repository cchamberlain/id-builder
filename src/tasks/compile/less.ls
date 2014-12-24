require! <[ less ]>

file = require "../../lib/file"

export compile-chunk = less.render

export compile-file = file.compile-file compile-chunk

export compile-all-files = file.compile-all-files compile-file, "less", "css"
