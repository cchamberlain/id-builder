fs = require "fs"

chai   = require "chai"
mkdirp = require "mkdirp"
rmrf   = require "rimraf"

clean = require "../../../src/tasks/clean"

{ expect } = chai
we         = it

random-string = ->
  Math
    .random!
    .toString 36
    .substring 7

describe "integrarion", !->
  describe "tasks", !->
    describe "clean", !->
      before-each (cb) !->
        @directory-path = ".tmp/#{random-string!}"
        mkdirp @directory-path, cb

      after-each (cb) !->
        rmrf @directory-path, cb

      describe "When called on a directory with files", !->
        we "should have deleted all files", (cb) ->
          error <~! fs.write-file "#{@directory-path}/#{random-string!}", "A"
          expect error .to.equal null

          error <~! fs.write-file "#{@directory-path}/#{random-string!}", "B"
          expect error .to.equal null

          error <~! clean path: @directory-path
          expect error .to.equal null

          error, nodes <~! fs.readdir @directory-path
          expect error .to.equal null
          expect nodes .to.have.length 0

          cb!
