require! <[
  moment
]>

export get-date = ->
  moment!.format!

# TODO: white color
export info = (message) !->
  console.log "#{get-date!} #{message}"

# TODO: orange color
export warn = (message) !->
  console.log "#{get-date!} #{message}", 

# TODO: red color
export error = (message) !->
  console.log "#{get-date!} error   #{message}", 

export task-info = (task, message) !-->
  info "#{task}: #{message}"

export task-warn = (task, message) !-->
  info "#{task}: #{message}"

export task-error = (task, message) !-->
  info "#{task}: #{message}"

# TODO: use UTF-8
export start-task = (name) ->
  info "#{name}: Start"

# TODO: use UTF-8
export finish-task = (name) ->
  info "#{name}: Finish"
