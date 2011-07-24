#Raphael = require './raphael'

class LineDiagram
  constructor: (@parentElement, @lineName) ->
    @diagram = Raphael @parentElement, 400, 400

    @lineWidth = 8
    @lineHalfWidth = @lineWidth / 2
    @lineLeft = -@lineHalfWidth
    @lineRight = @lineHalfWidth
    @lineRadius = 3 * @lineWidth
    @tickSize = 2 * @lineWidth / 3
    @stationSeparation = 8 * @lineWidth

    @addStation {
      name: 'Temple',
      gridX: 0,
      gridY: 0,
      lineEnd: true
    }

    @addStation {
      name: 'Embankment',
      gridX: 0,
      gridY: 1
    }

    @addStation {
      name: 'Ealing Broadway',
      gridX: 0,
      gridY: 2
    }

    @addLineSegment 0,0, 0,1
    @addLineSegment 0,1, 0,2

    line = @diagram.path "M 100,300 v 50 a #{@lineRadius},#{@lineRadius} 0 0 0 #{@lineRadius},#{@lineRadius} h #{@stationSeparation}"
    line.attr 'stroke-width', @lineWidth
    line.node.className.baseVal = @lineName

    line = @diagram.path "M 104,302.666 h #{@tickSize}"
    line.attr 'stroke-width', @tickSize
    line.node.className.baseVal = @lineName

    line = @diagram.path "M 80,320 h 50"
    line.attr 'stroke-width', @lineWidth
    line.node.className.baseVal = @lineName

  addStation: (station) ->
    transformX = @stationSeparation * (station.gridX + 1)
    transformY = @stationSeparation * (station.gridY + 1)

    if station.lineEnd
      tickX = @lineLeft - @tickSize
      tickLength = @tickSize + @lineWidth + @tickSize
    else
      tickX = @lineRight
      tickLength = @tickSize

    nameTextX = @lineRight + @tickSize + @tickSize

    tick = @diagram.path "M #{tickX},0 h #{tickLength}"
    tick.attr 'stroke-width', @tickSize
    tick.node.className.baseVal = @lineName
    tick.translate transformX, transformY

    nameText = @diagram.text nameTextX, 0, station.name
    nameText.attr 'font-size', 16
    nameText.attr 'font-family', 'London-Tube'
    nameText.attr 'text-anchor', 'start'
    nameText.node.className.baseVal = 'corporate'
    nameText.translate transformX, transformY

  addLineSegment: (fromGridX, fromGridY, toGridX, toGridY) ->
    transformX = @stationSeparation * (fromGridX + 1)
    transformY = @stationSeparation * (fromGridY + 1)

    length = @stationSeparation * (toGridY - fromGridY)

    line = @diagram.path "M 0,0 v #{length}"
    line.attr 'stroke-width', @lineWidth
    line.node.className.baseVal = @lineName
    line.translate transformX, transformY


module.exports = LineDiagram
