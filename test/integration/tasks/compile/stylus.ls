require! <[ fs chai mkdirp rimraf ]>

test   = require "../../../../src/lib/test"
stylus = require "../../../../src/tasks/compile/stylus"

we                = it
{ expect }        = chai
{ random-string } = test

describe "integration", !->
  describe "tasks", !->
    describe "stylus", !->
      before-each (cb) !->
        @directory-path = ".tmp/#{random-string!}"

        error <~! mkdirp @directory-path
        return cb error if error

        error <~! mkdirp "#{@directory-path}/src"
        return cb error if error

        error <~! mkdirp "#{@directory-path}/build"
        return cb error if error

        cb!

      after-each (cb) !->
        rimraf @directory-path, cb

      describe "When called on a directory with stylus files", !->
        we "should have compiled all stylus files", (cb) !->
          error <~! fs.write-file "#{@directory-path}/src/#{random-string!}.styl", ".class { width: (1 + 1) }"
          expect error .to.equal null

          error <~! fs.write-file "#{@directory-path}/src/#{random-string!}.styl", ".class { width: (2 + 2) }"
          expect error .to.equal null

          error <~! stylus.compile-all-files "#{@directory-path}/src", "#{@directory-path}/build"
          expect error .to.equal null

          error, nodes <~! fs.readdir "#{@directory-path}/build"
          expect error .to.equal null
          expect nodes .to.have.length 2
          expect nodes[0] .to.match /\.css$/
          expect nodes[1] .to.match /\.css$/

          cb!
