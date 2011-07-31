class Station
  constructor: (@code, @name) ->
    @down = undefined
    @downLeft = undefined
    @downRight = undefined

  code: ->
    @code

  name: ->
    @name

  below: (otherStation) ->
    if (otherStation)
      @down = otherStation

    @down

  belowLeft: (otherStation) ->
    if (otherStation)
      @downLeft = otherStation

    @downLeft

  belowRight: (otherStation) ->
    if (otherStation)
      @downRight = otherStation

    @downRight

module.exports = Station
