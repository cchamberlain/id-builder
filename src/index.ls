require! <[
  async
  id-debug
  id-type
  path
  prelude-ls
  moment
]>

{
  debug
  info
  warning
  error
} = id-debug

{
  each
  keys
  fold1
} = prelude-ls

default-options = require "./lib/default-options"
logging         = require "./lib/logging"
parse-options   = require "./lib/parse-options"
tasks           = require "./tasks"

log-info = (message) ->
  info "#{moment!.format!} #{message}"

run-task-with-options = (options, task, name, cb) !-->
  task-options = options?.tasks[name]

  return cb "No options found for task `#{task-options}`." unless task-options

  task-options.task-name = name
  task-options.longest-task-name-length = fold1 ((m, x) -> m.length > x.length and m or x), keys tasks

  logging.start-task name

  error <-! task.run task-options
  return cb error if error

  logging.finish-task name

  cb!

module.exports = (input-options = {}, cb) ->
  options = parse-options default-options, input-options

  auto-tasks = {}
  for let k, v of tasks
    auto-tasks[k] = v.dependencies ++ run-task-with-options options, v, k

  error, results <-! async.auto auto-tasks
  return cb error if error
