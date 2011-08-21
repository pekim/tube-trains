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
              train = trainFromXmlTrain train, platform, station

              if trainsByNumber[train.number]
                train2 = trainsByNumber[train.number]
                if train.secondsToStation < train2.secondsToStation
                  trainsByNumber[train.number] = train;
              else
                trainsByNumber[train.number] = train;

      trains = []
      for number, train of trainsByNumber
        trains.push train

      trains

    @when = new Date parsedObject.Time['@'].TimeStamp
    @trains = findTrains()

secondsFromMMSS = (stringTime) ->
  if stringTime == '-'
    0
  else
    [minutes, seconds] = stringTime.split ':'
    minutes = parseInt minutes
    seconds = parseInt seconds
    
    (minutes * 60) + seconds

trainFromXmlTrain = (xmlTrain, xmlPlatform, xmlStation) ->
  train = {}

  train.number = xmlTrain['@'].S
  train.secondsToStation = secondsFromMMSS xmlTrain['@'].C
  train.stationCode = xmlStation['@'].Code
  train.location = xmlTrain['@'].L

  train

module.exports = PredictionSummary
