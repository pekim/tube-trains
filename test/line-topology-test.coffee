LineTopology = require '../public/javascripts/line-topology'
fs = require 'fs'

districtFilename = __dirname + '/../public/line-data/district.json'
districtTopologyFilename = __dirname + '/../public/line-data/district.topology'

district = JSON.parse(fs.readFileSync(districtFilename, 'ascii'))

exports.small = (test) ->
  topology =  new LineTopology district.stations, """
            EBY
             | 
        RMD ECM
         |   | 
    WDN KEW ACT
  """
  test.strictEqual(topology.gridWidth, 3)
  test.strictEqual(topology.gridHeight, 3)

  grid = topology.grid
  test.strictEqual(grid[0][2].code, 'EBY')

  test.done()

exports.district = (test) ->
  topology =  new LineTopology district.stations, fs.readFileSync(districtTopologyFilename, 'ascii')

  test.strictEqual(topology.gridWidth, 3)
  test.strictEqual(topology.gridHeight, 43)

  grid = topology.grid
  test.strictEqual(grid[0][2].code, 'EBY')
  
  test.done()
