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
  constructor: (@text) ->
      lines = @linesFromText()
      @validateLines(lines)
        
      @gridWidth = ((lines[0].length / 4) + 1) | 0
      @gridHeight = ((lines.length / 2) + 1) | 0
      @grid = @createGrid lines
      console.log @grid

    linesFromText: ->
      lines = @text.split '\n'
      if lines[lines.length - 1].length == 0
        # Discard empty last line.
        lines.pop()
      
      return lines

    validateLines: (lines) ->
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

    createGrid: (lines) ->
      grid = []
  
      # Stations.
      # We've already performed validation on the lines, so we can make
      # all the assumptions we need here.
      for line in lines by 2
        for c in [0..@gridWidth]
          code = line.substr(c * 4, 3)
          if code != '   '
            #stationInfo = stations[code]
            #name = stationInfo ? stationInfo.name : 'unknown'
            #var station = new Station(code, name);
            #grid.push(station);
            grid.push code
          else
            grid.push null
        
      ###
      var join;
      // Vertical track joins.
      for (var l = 1; l < lines.length; l += 2) {
        for (var c = 0; c < gridWidth; c++) {
          join = lines[l].substr(c * 4 + 1, 1);
          if (join === '|') {
            var stationAbove = grid[((l - 1) / 2 * gridWidth) + c];
            var stationBelow = grid[((l + 1) / 2 * gridWidth) + c];
            if (!stationAbove || !stationBelow) {
              throw 'Cannot link ' + stationAbove + ' to ' + stationBelow;
            }
            stationAbove.downTo(stationBelow);
          }
        }
      }
      
      // Cross-verticals track joins.
      for (var l = 1; l < lines.length; l += 2) {
        for (var c = 0; c < gridWidth - 1; c++) {
          join = lines[l].substr(c * 4 + 3, 1);
          switch (join) {
          case '\\':
            var stationLeftAbove = grid[((l - 1) / 2 * gridWidth) + c];
            var stationRightBelow = grid[((l + 1) / 2 * gridWidth) + c + 1];
            if (!stationLeftAbove || !stationRightBelow) {
              throw 'Cannot link ' + stationLeftAbove + ' to ' + stationRightBelow;
            }
            stationLeftAbove.downRightTo(stationRightBelow);
            break;
          case '/':
            var stationRightAbove = grid[((l - 1) / 2 * gridWidth) + c + 1];
            var stationLeftBelow = grid[((l + 1) / 2 * gridWidth) + c];
            if (!stationRightAbove || !stationLeftBelow) {
              throw 'Cannot link ' + stationRightAbove + ' to ' + stationLeftBelow;
            }
            stationRightAbove.downLeftTo(stationLeftBelow);
            break;
          }
        }
      }
      ###
        
      return grid
        
module.exports = LineTopology
