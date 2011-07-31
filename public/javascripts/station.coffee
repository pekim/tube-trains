class Station
  constructor: (@code, @name, @row, @column) ->
    @down = undefined
    @downLeft = undefined
    @downRight = undefined
    
    @connectedAbove = false
    @connectedBelow = false

  code: ->
    @code

  name: ->
    @name

  row: ->
    @row

  column: ->
    @column

  below: (otherStation) ->
    if (otherStation)
      @down = otherStation

      @connectedBelow = true
      otherStation.connectedAbove = true

    @down

  belowLeft: (otherStation) ->
    if (otherStation)
      @downLeft = otherStation

      @connectedBelow = true
      otherStation.connectedAbove = true

    @downLeft

  belowRight: (otherStation) ->
    if (otherStation)
      @downRight = otherStation

      @connectedBelow = true
      otherStation.connectedAbove = true

    @downRight

  endOfLine: ->
    !@connectedAbove || !@connectedBelow

module.exports = Station
