clean      = require "./src/tasks/clean"
livescript = require "./src/tasks/compile/livescript"

source-directory = "src"
build-directory = "build"

error <-! clean build-directory
throw error if error

error <-! livescript.compile-all-files source-directory, build-directory
throw error if error
