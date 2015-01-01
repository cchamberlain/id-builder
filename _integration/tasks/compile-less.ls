require! <[ fs chai mkdirp rimraf ]>

tests = require "../../../lib/tests"
less  = require "../../../tasks/compile-less"

we                = it
{ expect }        = chai
{ tests.random-string } = tests

describe "integration", !->
  describe "tasks", !->
    describe "compile", !->
      describe "less", !->
        before-each (cb) !->
          @directory-path = ".tmp/#{tests.random-string!}"

          error <~! mkdirp @directory-path
          return cb error if error

          error <~! mkdirp "#{@directory-path}/src"
          return cb error if error

          error <~! mkdirp "#{@directory-path}/build"
          return cb error if error

          cb!

        after-each (cb) !->
          rimraf @directory-path, cb

        describe "When called on a directory with less files", !->
          we "should have compiled all less files", (cb) !->
            error <~! fs.write-file "#{@directory-path}/src/#{tests.random-string!}.less", ".class { width: (1 + 1) }"
            expect error .to.equal null

            error <~! fs.write-file "#{@directory-path}/src/#{tests.random-string!}.less", ".class { width: (2 + 2) }"
            expect error .to.equal null

            error <~! less.compile-all-files "#{@directory-path}/src", "#{@directory-path}/build"
            expect error .to.equal null

            error, nodes <~! fs.readdir "#{@directory-path}/build"
            expect error .to.equal null
            expect nodes .to.have.length 2
            expect nodes[0] .to.match /\.css$/
            expect nodes[1] .to.match /\.css$/

            cb!
