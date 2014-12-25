require! <[ fs chai mkdirp rimraf ]>

test  = require "../../../src/lib/test"
clean = require "../../../src/tasks/clean"

we                = it
{ expect }        = chai
{ random-string } = test

describe "integration", !->
  describe "tasks", !->
    describe "clean", !->
      before-each (cb) !->
        @directory-path = ".tmp/#{random-string!}"
        mkdirp @directory-path, cb

      after-each (cb) !->
        rimraf @directory-path, cb

      describe "When called on a directory with files", !->
        we "should have deleted all files", (cb) ->
          error <~! fs.write-file "#{@directory-path}/#{random-string!}", "A"
          expect error .to.equal null

          error <~! fs.write-file "#{@directory-path}/#{random-string!}", "B"
          expect error .to.equal null

          error <~! clean @directory-path
          expect error .to.equal null

          error, nodes <~! fs.readdir @directory-path
          expect error .to.equal null
          expect nodes .to.have.length 0

          cb!
