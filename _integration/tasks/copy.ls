require! <[ fs chai mkdirp rimraf ]>

tests = require "../../../lib/tests"
copy  = require "../../../tasks/copy"

we                = it
{ expect }        = chai
{ tests.random-string } = tests

describe "integration", !->
  describe "tasks", !->
    describe "copy", !->
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

      describe "When called on a directory with files other then compiled files", !->
        we "should have copied all files that were to be compiled", (cb) ->
          error <~! fs.write-file "#{@directory-path}/src/#{tests.random-string!}.styl", ""
          expect error .to.equal null

          error <~! fs.write-file "#{@directory-path}/src/#{tests.random-string!}.less", ""
          expect error .to.equal null

          error <~! fs.write-file "#{@directory-path}/src/#{tests.random-string!}.ls", ""
          expect error .to.equal null

          error <~! fs.write-file "#{@directory-path}/src/#{tests.random-string!}.coffee", ""
          expect error .to.equal null

          error <~! fs.write-file "#{@directory-path}/src/#{tests.random-string!}.jade", ""
          expect error .to.equal null

          error <~! fs.write-file "#{@directory-path}/src/#{tests.random-string!}.txt", "copy this"
          expect error .to.equal null

          error <~! fs.write-file "#{@directory-path}/src/#{tests.random-string!}.json", "{\"copy\": \"this\"}"
          expect error .to.equal null

          error <~! fs.write-file "#{@directory-path}/src/.gitignore", "copythis"
          expect error .to.equal null

          error <~! copy.copy-all-files "#{@directory-path}/src", "#{@directory-path}/build"
          expect error .to.equal null

          error, nodes <~! fs.readdir "#{@directory-path}/build"
          expect error .to.equal null
          expect nodes .to.have.length 3

          cb!
