exports.lines = [
  {displayName: 'Bakerloo', name: "bakerloo", code: 'B'}
  {displayName: 'Central', name: "central", code: 'C'}
  {displayName: 'Circle', name: "circle", code: 'H'}
  {displayName: 'District', name: "district", code: 'D'}
  {displayName: 'Hammersmith & City', name: "hammersmith-city", code: 'H'}
  {displayName: 'Jubilee', name: "jubilee", code: 'J'}
  {displayName: 'Metropolitan', name: "metropolitan", code: 'M'}
  {displayName: 'Northern', name: "northern", code: 'N'}
  {displayName: 'Piccadilly', name: "piccadilly", code: 'P'}
  {displayName: 'Victoria', name: "victoria", code: 'V'}
  {displayName: 'Waterloo & City', name: "waterloo-city", code: 'W'}
]

linesByName = {}
for line in exports.lines
  linesByName[line.name] = line
exports.linesByName = linesByName
