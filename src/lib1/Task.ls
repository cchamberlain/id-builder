{ EventEmitter } = require "events"

# A Task is an asynchronous process with a name and dependencies. A Task is ran
# when all it's dependencies are consumed.

# Clean
# CompileBrowserify (Clean, CompileCoffeeScript, CompileCopy, CompileJade, CompileLiveScript)
# CompileCoffeeScript (Clean)
# CompileCopy (Clean)
# CompileJade (Clean)
# CompileLess (Clean)
# CompileLiveScript (Clean)
# CompileStylus (Clean)
# RunServers (CompileBrowserify CompileCoffeeScript CompileCopy CompileJade CompileLess CompileLiveScript CompileStylus)
# RunTests (CompileBrowserify CompileCoffeeScript CompileCopy CompileJade CompileLess CompileLiveScript CompileStylus)
# Watch (RunTests)
# WatchBrowserify (RunTests)
# WatchCoffeeScript (RunTests)
# WatchCopy (RunTests)
# WatchJade (RunTests)
# WatchLess (RunTests)
# WatchLiveScript (RunTests)
# WatchStylus (RunTests)
# WatchServers (RunTests)
# WatchTests (RunTests)

export class Task extends EventEmitter
  (options) ->
    @enabled          = options.enabled      or true
    @name             = options.name         or ""
    @dependencies     = options.dependencies or []

  run: (cb) ->
    @emit "done"
    cb?!


