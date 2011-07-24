#$ = require 'jquery'
LineDiagram = require './line-diagram'

exports.init = (lineName) ->
  $(document).ready ->
    diagram = new LineDiagram $('#line-diagram')[0], lineName
