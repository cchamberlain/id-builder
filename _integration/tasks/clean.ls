require! <[
  fs
  chai
  mkdirp
  rimraf
]>

tests = require "../../../lib/tests"
clean = require "../../../lib/clean"

we                = it
{ expect }        = chai
{ tests.random-string } = tests

describe "integration", !->
  describe "tasks", !->
    describe "clean", !->
      before-each (cb) !->
        @directory-path = ".tmp/#{tests.random-string!}"
        mkdirp @directory-path, cb

      after-each (cb) !->
        rimraf @directory-path, cb

      describe "When called on a directory with files", !->
        we "should have deleted all files", (cb) ->
          error <~! fs.write-file "#{@directory-path}/#{tests.random-string!}", "A"
          expect error .to.equal null

          error <~! fs.write-file "#{@directory-path}/#{tests.random-string!}", "B"
          expect error .to.equal null

          error <~! clean.directory @directory-path
          expect error .to.equal null

          error, nodes <~! fs.readdir @directory-path
          expect error .to.equal null
          expect nodes .to.have.length 0

          cb!
