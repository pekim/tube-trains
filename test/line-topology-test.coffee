LineTopology = require '../public/javascripts/line-topology'
fs = require 'fs'

districtFilename = __dirname + '/../public/line-data/district.topology'

exports.grid = (test) ->
  topology =  new LineTopology """
            EBY
             | 
        RMD ECM
         |   | 
    WDN KEW ACT
  """
  
  test.done()

exports.real = (test) ->
  topology =  new LineTopology fs.readFileSync(districtFilename, 'ascii')
  
  test.done()
