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
    @timestamp = new Date parsedObject.Time['@'].TimeStamp

  when: ->
    @timestamp

module.exports = PredictionSummary
