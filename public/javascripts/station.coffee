class Station
  constructor: (@code, @name) ->
    @down = undefined

  code: ->
    @code

  name: ->
    @name

  below: (otherStation) ->
    if (otherStation)
      @down = otherStation

    @down

module.exports = Station
