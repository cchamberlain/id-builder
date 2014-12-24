require! <[ fs chai mkdirp rimraf ]>

test       = require "../../../../src/lib/test"
livescript = require "../../../../src/tasks/compile/livescript"

we                = it
{ expect }        = chai
{ random-string } = test

describe "integrarion", !->
  describe "tasks", !->
    describe "livescript", !->
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

      describe "When called on a directory with livescript files", !->
        we "should have compiled all livescript files", (cb) !->
          error <~! fs.write-file "#{@directory-path}/src/#{random-string!}.ls", "-> console.log('123')"
          expect error .to.equal null

          error <~! fs.write-file "#{@directory-path}/src/#{random-string!}.ls", "-> console.log('456')"
          expect error .to.equal null

          error <~! livescript.compile-all-files "#{@directory-path}/src", "#{@directory-path}/build"
          expect error .to.equal null

          error, nodes <~! fs.readdir "#{@directory-path}/build"
          expect error .to.equal null
          expect nodes .to.have.length 2
          expect nodes[0] .to.match /\.js$/
          expect nodes[1] .to.match /\.js$/

          cb!
