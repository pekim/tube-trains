locationText = require '../lib/location-text'

exports.at = (test) ->
  location = locationText.parse 'At Stepney Green Platform 1'
  
  test.strictEqual 'Stepney Green', location.station
  test.strictEqual 0, location.relativeDistance

  test.done()

exports.left = (test) ->
  location = locationText.parse 'Left Tower Hill'
  
  test.strictEqual 'Tower Hill', location.station
  test.strictEqual 0.25, location.relativeDistance

  test.done()

exports.between = (test) ->
  location = locationText.parse 'Between Willesden Junction and Kensal Green'
  
  test.strictEqual 'Willesden Junction', location.station
  test.strictEqual 'Kensal Green', location.station2
  test.strictEqual 0.5, location.relativeDistance

  test.done()

exports.betweenWithAnd = (test) ->
  location = locationText.parse 'Between Lambeth and Elephant and Castle'
  
  test.strictEqual 'Lambeth', location.station
  test.strictEqual 'Elephant and Castle', location.station2
  test.strictEqual 0.5, location.relativeDistance

  test.done()
