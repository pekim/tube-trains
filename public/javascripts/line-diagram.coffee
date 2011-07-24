#Raphael = require './raphael'

class LineDiagram
  constructor: (@parentElement, @lineName) ->
    @diagram = Raphael @parentElement, 0, 0, 200, 200

    @station 'Temple'
    
    text = @diagram.text 0, 0, 'some text i'
    text.attr 'font-size', 50
    text.attr 'font-family', 'London-Tube'
    text.attr 'text-anchor', 'start'
    console.log text.attr('y')
    box = text.getBBox()
    console.log box.y
    text.attr 'y', ((box.height / 2) + text.attr('y'))
    text.node.className.baseVal = 'corporate'
    #text.attr 'y', 100

    lineWidth = 8
    lineRadius = 3 * lineWidth
    tickSize = 2 * lineWidth / 3
    console.log tickSize
    stationSeparation = 6 * lineWidth

    line = @diagram.path "M 100,100 v 50 a #{lineRadius},#{lineRadius} 0 0 0 #{lineRadius},#{lineRadius} h #{stationSeparation}"
    line.attr 'stroke-width', lineWidth
    line.node.className.baseVal = @lineName

    line = @diagram.path "M 104,102.666 h #{tickSize}"
    line.attr 'stroke-width', tickSize
    line.node.className.baseVal = @lineName

    line = @diagram.path "M 80,120 h 50"
    line.attr 'stroke-width', lineWidth
    line.node.className.baseVal = @lineName

  station: (name) ->
    console.log name

module.exports = LineDiagram
