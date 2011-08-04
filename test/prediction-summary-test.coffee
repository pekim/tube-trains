PredictionSummary = require '../lib/prediction-summary'
fs = require 'fs'

exports.simple = (test) ->
  fs.readFile __dirname + '/data/D.xml', (err, xml) ->
    summary = new PredictionSummary
    summary.parse xml, ->
      test.strictEqual new Date('2011/08/02 08:30:47').getTime(), summary.when().getTime()

      test.done()
