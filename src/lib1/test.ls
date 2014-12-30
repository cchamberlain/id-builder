export random-string = ->
  Math
    .random!
    .toString 36
    .substring 7
