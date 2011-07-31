LineTopology = require '../public/javascripts/line-topology'
fs = require 'fs'

districtFilename = __dirname + '/../public/line-data/district.topology'

exports.small = (test) ->
  topology =  new LineTopology """
            EBY
             | 
        RMD ECM
         |   | 
    WDN KEW ACT
  """
  test.strictEqual(topology.gridWidth, 3)
  test.strictEqual(topology.gridHeight, 3)

  grid = topology.grid
  test.strictEqual(grid[0][2], 'EBY')

  test.done()

exports.district = (test) ->
  topology =  new LineTopology fs.readFileSync(districtFilename, 'ascii')

  test.strictEqual(topology.gridWidth, 3)
  test.strictEqual(topology.gridHeight, 43)

  grid = topology.grid
  test.strictEqual(grid[0][2], 'EBY')
  
  test.done()
