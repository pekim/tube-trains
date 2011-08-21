xml2js = require 'xml2js'

class PredictionSummary
  constructor: ->
    @parser = new xml2js.Parser

  parse: (xml, callback) ->
    @parser.addListener 'end', (object) =>
      @init object
      callback()

    @parser.parseString xml

  init: (parsedObject) ->
    findTrains = ->
      trainsByNumber = {}

      for station in parsedObject.S
        for platform in station.P
          if platform.T
            for train in platform.T
              trainNumber = train['@'].S
              trainsByNumber[trainNumber] = train;

      trains = []
      for number, train of trainsByNumber
        trains.push train

      trains

    @when = new Date parsedObject.Time['@'].TimeStamp
    @trains = findTrains()

module.exports = PredictionSummary
