#Raphael = require './raphael'

class LineDiagram
  constructor: (@parentElement, @lineName) ->
    @diagram = Raphael @parentElement, 800, 400

    @lineWidth = 8
    @lineHalfWidth = @lineWidth / 2
    @lineLeft = -@lineHalfWidth
    @lineRight = @lineHalfWidth
    @lineRadius = 3 * @lineWidth
    @tickSize = 2 * @lineWidth / 3
    @stationSeparationX = 24 * @lineWidth
    @stationSeparationY = 8 * @lineWidth

    @gridOffsetX = 4 * @lineWidth
    @gridOffsetY = @gridOffsetX

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

    @addStation {
      name: 'Acton Town',
      gridX: 1,
      gridY: 3,
      lineEnd: true
    }

    @addLineSegment 0,0, 0,1
    @addLineSegment 0,1, 0,2
    @addLineSegment 0,2, 1,3

  addStation: (station) ->
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
    @translate tick, station.gridX, station.gridY

    nameText = @diagram.text nameTextX, 0, station.name
    nameText.attr 'font-size', 16
    nameText.attr 'font-family', 'London-Tube'
    nameText.attr 'text-anchor', 'start'
    nameText.node.className.baseVal = 'corporate'
    @translate nameText, station.gridX, station.gridY

  addLineSegment: (fromGridX, fromGridY, toGridX, toGridY) ->
    if (fromGridX  == toGridX)
      @addVerticalLineSegment fromGridX, fromGridY, toGridX, toGridY
    else
      @addDiagonalLineSegment fromGridX, fromGridY, toGridX, toGridY

  addVerticalLineSegment: (fromGridX, fromGridY, toGridX, toGridY) ->
    length = @stationSeparationY * (toGridY - fromGridY)

    line = @diagram.path "M 0,0 v #{length}"
    line.attr 'stroke-width', @lineWidth
    line.node.className.baseVal = @lineName
    @translate line, fromGridX, fromGridY

  addDiagonalLineSegment: (fromGridX, fromGridY, toGridX, toGridY) ->
    verticalSegmentLength = @stationSeparationY * (toGridY - fromGridY)
    verticalSegmentLength -= (2 * @lineRadius)
    verticalSegmentLength /= 2

    middleLineLength = @stationSeparationX * (toGridX - fromGridX)
    middleLineLength -= (2 * @lineRadius)

    path = "M 0,0 "
    path += "v #{verticalSegmentLength} "
    path += "a #{@lineRadius},#{@lineRadius} 0 0 0 #{@lineRadius},#{@lineRadius} "
    path += "h #{middleLineLength} "
    path += "a #{@lineRadius},#{@lineRadius} 0 0 1 #{@lineRadius},#{@lineRadius} "
    path += "v #{verticalSegmentLength} "

    line = @diagram.path path
    line.attr 'stroke-width', @lineWidth
    line.node.className.baseVal = @lineName
    @translate line, fromGridX, fromGridY

  translate: (object, gridX, gridY) ->
    translateX = @gridOffsetX + (@stationSeparationX * gridX)
    translateY = @gridOffsetY + (@stationSeparationY * gridY)
    object.translate translateX, translateY

module.exports = LineDiagram
