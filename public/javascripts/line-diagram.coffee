#Raphael = require './raphael'
LineTopology = require './line-topology'

class LineDiagram
  constructor: (@parentElement, @lineName) ->
    @interStationPaths = {}

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

    $.when($.getJSON("/line-data/#{@lineName}.json"), $.get("/line-data/#{@lineName}.topology")).done (jsonResonse, topologyresponse) =>
      line = jsonResonse[0]
      topologyText = topologyresponse[0]

      topology =  new LineTopology line.stations, topologyText 

      height = (@stationSeparationY * (topology.gridHeight - 1)) + (2 * @gridOffsetY)
      @diagram = Raphael @parentElement, 800, height

      for row in topology.grid
        for station in row
          if station
            @addStation {
              name: station.name,
              gridX: station.column,
              gridY: station.row,
              lineEnd: station.endOfLine()
            }

            if station.below()
              stationBelow = topology.grid[station.row + 1][station.column]
              pathId = "#{station.code}-#{stationBelow.code}"
              @addLineSegment pathId, station.column, station.row, station.column, station.row + 1

            if station.belowLeft()
              stationBelow = topology.grid[station.row + 1][station.column - 1]
              pathId = "#{station.code}-#{stationBelow.code}"
              @addLineSegment pathId, station.column, station.row, station.column - 1, station.row + 1

            if station.belowRight()
              stationBelow = topology.grid[station.row + 1][station.column + 1]
              pathId = "#{station.code}-#{stationBelow.code}"
              @addLineSegment pathId, station.column, station.row, station.column + 1, station.row + 1

      #height = (@stationSeparationY * (topology.gridHeight - 1)) + (2 * @gridOffsetY)
      #$('#line-diagram svg').attr 'height', height

      animate = (train, path, seconds) ->
        train.animateAlong path, seconds * 1000, true, ->
          animateBack train, path, seconds

      animateBack = (train, path, seconds) ->
        train.animateAlongBack path, seconds * 1000, true, ->
          animate train, path, seconds

      train = @diagram.rect 416 - 5, 224 - 5, 10, 10
      train.attr 'stroke', 'none'
      train.attr 'fill', '#f00'
      train.node.className.baseVal = 'train'
      path = @interStationPaths['CHP-TGR']

      train2 = @diagram.rect 224 - 5, 288 - 5, 10, 10
      train2.attr 'stroke', 'none'
      train2.attr 'fill', '#f00'
      train2.node.className.baseVal = 'train'
      path2 = @interStationPaths['TGR-STB']

      animate(train, path, 9)
      animate(train2, path2, 1.25)
      #train.animateAlong path, 5000, false, ->
      #  train.animateAlongBack path, 5000, false
      #train.animateAlong @interStationPaths['RMD-KEW'], 5000, false

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

  addLineSegment: (pathId, fromGridX, fromGridY, toGridX, toGridY) ->
    if (fromGridX  == toGridX)
      @addVerticalLineSegment pathId, fromGridX, fromGridY, toGridX, toGridY
    else
      @addDiagonalLineSegment pathId, fromGridX, fromGridY, toGridX, toGridY

  addVerticalLineSegment: (pathId, fromGridX, fromGridY, toGridX, toGridY) ->
    length = @stationSeparationY * (toGridY - fromGridY)

    line = @diagram.path "M 0,0 v #{length}"
    line.attr 'stroke-width', @lineWidth
    line.node.className.baseVal = @lineName
    
    $(line.node).attr('data-id', pathId)
    @interStationPaths[pathId] = line
    
    @translate line, fromGridX, fromGridY

  addDiagonalLineSegment: (pathId, fromGridX, fromGridY, toGridX, toGridY) ->
    verticalSegmentLength = @stationSeparationY * (toGridY - fromGridY)
    verticalSegmentLength -= (2 * @lineRadius)
    verticalSegmentLength /= 2

    middleLineLength = @stationSeparationX * Math.abs(toGridX - fromGridX)
    middleLineLength -= (2 * @lineRadius)

    path = "M 0,0 "
    path += "v #{verticalSegmentLength} "
    if fromGridX < toGridX
      path += "a #{@lineRadius},#{@lineRadius} 0 0 0 #{@lineRadius},#{@lineRadius} "
      path += "h #{middleLineLength} "
      path += "a #{@lineRadius},#{@lineRadius} 0 0 1 #{@lineRadius},#{@lineRadius} "
    else
      path += "a #{@lineRadius},#{@lineRadius} 0 0 1 -#{@lineRadius},#{@lineRadius} "
      path += "h -#{middleLineLength} "
      path += "a #{@lineRadius},#{@lineRadius} 0 0 0 -#{@lineRadius},#{@lineRadius} "
    path += "v #{verticalSegmentLength} "

    line = @diagram.path path
    line.attr 'stroke-width', @lineWidth
    line.node.className.baseVal = @lineName

    $(line.node).attr('data-id', pathId)
    @interStationPaths[pathId] = line

    @translate line, fromGridX, fromGridY

  translate: (object, gridX, gridY) ->
    translateX = @gridOffsetX + (@stationSeparationX * gridX)
    translateY = @gridOffsetY + (@stationSeparationY * gridY)
    object.translate translateX, translateY

module.exports = LineDiagram
