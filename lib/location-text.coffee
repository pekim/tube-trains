parse = (text) ->
  location = {}

  verb = text.split(' ')[0]

  switch verb
    when 'At'
      location.distancePercent = 0
      location.station = /At\s+(.*)\s+Platform.*/.exec(text)[1]
    when 'Left'
      location.distancePercent = 25
      location.station = /Left\s+(.*)\s*/.exec(text)[1]
    when 'Between'
      location.distancePercent = 50
      stations = /Between\s+(.*?)\s+and\s+(.*)\s*/.exec(text)
      location.station = stations[1]
      location.station2 = stations[2]
    when 'Approaching'
      location.distancePercent = 75
    else
      location.station = text

  location

exports.parse = parse
