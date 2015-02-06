require! <[
  async
  prelude-ls
  moment
]>

{
  each
  keys
  fold1
} = prelude-ls

default-options = require "./lib/default-options"
logging         = require "./lib/logging"
parse-options   = require "./lib/parse-options"

log-info = (message) ->
  console.log "#{moment!.format!} #{message}"

run-task-with-options = (options, task, name, cb) !-->
  task-options = options?.tasks[name]

  unless task-options
    return cb "No options found for task `#{task-options}`."

  unless task-options.enabled
    logging.disabled-task name
    return cb!

  task-options.task-name = name

  logging.start-task name

  error <-! task.run task-options
  return cb error if error

  logging.finish-task name

  cb!

module.exports = (input-options = {}, cb) ->
  # First set globals.
  global.options = parse-options default-options, input-options

  # Then require.
  tasks = require "./tasks"

  auto-tasks = {}
  for let k, v of tasks
    auto-tasks[k] = v.dependencies ++ run-task-with-options global.options, v, k

  error, results <-! async.auto auto-tasks
  return cb error if error
