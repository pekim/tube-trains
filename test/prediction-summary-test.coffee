PredictionSummary = require '../lib/prediction-summary'
fs = require 'fs'

exports.when = (test) ->
  parse (summary) ->
    test.strictEqual new Date('2011/08/02 08:30:47').getTime(), summary.when.getTime()
    test.done()

exports.trains = (test) ->
  parse (summary) ->
    test.strictEqual 109, summary.trains.length

    test.done()

parse = (test) ->
  fs.readFile __dirname + '/data/D.xml', (err, xml) ->
    summary = new PredictionSummary
    summary.parse xml, ->
      test summary
