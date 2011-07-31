Station = require './station'

class LineTopologyOld
  constructor: (text) ->
    lines = text.split '\n'

    # Determine line length.
    @maxLineLen = lines[0].indexOf '|'
    if (@maxLineLen == -1)
      throw 'Line length marker, "|", not found in first line "#{@lines[0]}"'
    lines = lines[1..]

    @grid = []

    for line in lines by 2
      stations = []
      stationRe = /([A-Z]{3}) */g
      result = stationRe.exec line
      while result
        stations.push result[0]
        result = stationRe.exec line
      
      @grid.push stations

    #for line in lines[1..] by 2
    #  console.log line

    console.log @grid

module.exports = LineTopology

#------------------------------------------------------

class LineTopology
  constructor: (@stations, @topologyText) ->
      @linesFromText()
      @validateLines()
        
      @gridWidth = ((@lines[0].length / 4) + 1) | 0
      @gridHeight = ((@lines.length / 2) + 1) | 0
      @createGrid()

    linesFromText: ->
      @lines = @topologyText.split '\n'
      if @lines[@lines.length - 1].length == 0
        # Discard empty last line.
        @lines.pop()

    validateLines: () ->
      lines = @lines

      checkLineLength = ->
        for line in lines
          if lineLength
            if line.length != lineLength
              throw "Line (#{line}) length is #{line.length} not #{lineLength}"
          else
            lineLength = line.length
      
      numberOfLines = ->
        if lines.length % 2 == 0
          throw "Expected odd number of lines, not #{lines.length}"
      
      oddLines = ->
        regexp = /^[ |A-Z]{3}( [ |A-Z]{3})*$/
  
        for line in lines by 2
          if !regexp.test(line)
            throw "Format of station names line (#{line}) incorrect"
      
      evenLines = ->
        regexp = /^ [ |\|] ([ |\\|\/|u|n] [ |\|] )*$/
  
        for line in lines[1..] by 2
          if !regexp.test(line)
            throw "Format of track joining line (#{line}) incorrect"

      checkLineLength()
      numberOfLines()
      oddLines()
      evenLines()

    createGrid: ->
      @grid = []

      # Stations.
      # We've already performed validation on the lines, so we can make
      # all the assumptions we need here.
      r = 0
      for line in @lines by 2
        row = []

        for c in [0..@gridWidth - 1]
          code = line.substr(c * 4, 3)
          if code != '   '
            stationInfo = @stations[code]
            name = if stationInfo then stationInfo.name else 'unknown'
            station = new Station(code, name, r, c);
            row.push station
          else
            row.push null

        @grid.push row
        r++

      # Track joins.
      for l in [1..@lines.length - 1] by 2
        for c in [0..@gridWidth - 1]
          join = @lines[l].substr(c * 4 + 1, 1)
          if join == '|'
            stationAbove = @grid[(l - 1) / 2][c]
            stationBelow = @grid[(l + 1) / 2][c]
            if (!stationAbove || !stationBelow)
              throw 'Cannot link ' + stationAbove.code + ' to ' + stationBelow.code
            stationAbove.below stationBelow

      # Diagonal track joins.
      for l in [1..@lines.length - 1] by 2
        for c in [0..@gridWidth - 2]
          join = @lines[l].substr(c * 4 + 3, 1)
          switch  join
            when '\\'
              stationAbove = @grid[(l - 1) / 2][c]
              stationBelow = @grid[(l + 1) / 2][c + 1]
              if (!stationAbove || !stationBelow)
                throw 'Cannot link ' + stationAbove.code + ' to ' + stationBelow.code
              stationAbove.belowRight stationBelow
            when '/'
              stationAbove = @grid[(l - 1) / 2][c + 1]
              stationBelow = @grid[(l + 1) / 2][c]
              if (!stationAbove || !stationBelow)
                throw 'Cannot link ' + stationAbove.code + ' to ' + stationBelow.code
              stationAbove.belowLeft stationBelow

    grid: ->
      @grid

    gridWidth: ->
      @gridWidth
        
    gridHeight: ->
      @gridHeight
        
module.exports = LineTopology
