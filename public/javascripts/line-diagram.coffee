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
            @addStation station

            if station.below()
              @addLineSegment station, station.below()

            if station.belowLeft()
              @addLineSegment station, station.belowLeft()

            if station.belowRight()
              @addLineSegment station, station.belowRight()

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

  addStation: (station) ->
    if station.endOfLine()
      tickX = @lineLeft - @tickSize
      tickLength = @tickSize + @lineWidth + @tickSize
    else
      tickX = @lineRight
      tickLength = @tickSize

    nameTextX = @lineRight + @tickSize + @tickSize

    tick = @diagram.path "M #{tickX},0 h #{tickLength}"
    tick.attr 'stroke-width', @tickSize
    tick.node.className.baseVal = @lineName
    @translate tick, station

    nameText = @diagram.text nameTextX, 0, station.name
    nameText.attr 'font-size', 16
    nameText.attr 'font-family', 'London-Tube'
    nameText.attr 'text-anchor', 'start'
    nameText.node.className.baseVal = 'corporate'
    @translate nameText, station

  addLineSegment: (fromStation, toStation) ->
    pathId = "#{fromStation.code}-#{toStation.code}"

    if (fromStation.column == toStation.column)
      @addVerticalLineSegment pathId, fromStation, toStation
    else
      @addDiagonalLineSegment pathId, fromStation, toStation

  addVerticalLineSegment: (pathId, fromStation, toStation) ->
    length = @stationSeparationY * (toStation.row - fromStation.row)

    line = @diagram.path "M 0,0 v #{length}"
    line.attr 'stroke-width', @lineWidth
    line.node.className.baseVal = @lineName
    
    $(line.node).attr('data-id', pathId)
    @interStationPaths[pathId] = line
    
    @translate line, fromStation

  addDiagonalLineSegment: (pathId, fromStation, toStation) ->
    verticalSegmentLength = @stationSeparationY * (toStation.row - fromStation.row)
    console.log verticalSegmentLength
    verticalSegmentLength -= (2 * @lineRadius)
    verticalSegmentLength /= 2

    middleLineLength = @stationSeparationX * Math.abs(toStation.column - fromStation.column)
    console.log middleLineLength
    middleLineLength -= (2 * @lineRadius)

    path = "M 0,0 "
    path += "v #{verticalSegmentLength} "
    if fromStation.column < toStation.column
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

    @translate line, fromStation

  translate: (object, station) ->
    translateX = @gridOffsetX + (@stationSeparationX * station.column)
    translateY = @gridOffsetY + (@stationSeparationY * station.row)
    object.translate translateX, translateY

module.exports = LineDiagram
