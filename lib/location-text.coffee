parse = (text) ->
  location = {}

  verb = text.split(' ')[0]

  switch verb
    when 'At'
      location.relativeDistance = 0.0
      location.station = /At\s+(.*)\s+Platform.*/.exec(text)[1]
    when 'Left'
      location.relativeDistance = 0.25
      location.station = /Left\s+(.*)\s*/.exec(text)[1]
    when 'Between'
      location.relativeDistance = 0.5
      stations = /Between\s+(.*?)\s+and\s+(.*)\s*/.exec(text)
      location.station = stations[1]
      location.station2 = stations[2]
    when 'Approaching'
      location.relativeDistance = 0.75
    else
      location.station = text

  location

exports.parse = parse
