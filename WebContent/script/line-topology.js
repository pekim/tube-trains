function LineTopology(text, stations) {
  var gridWidth;
  var gridHeight;
  var grid;
  
  init();
  
  function init() {
    var lines = linesFromText();
    validateLines(lines);
    
    gridWidth = ((lines[0].length / 4) + 1) | 0;
    gridHeight = ((lines.length / 2) + 1) | 0;
    grid = createGrid(lines);
  }
  
  this.gridWidth = function () {
    return gridWidth;
  };
  
  this.gridHeight = function () {
    return gridHeight;
  };
  
  this.grid = function () {
    return grid;
  };

  function linesFromText() {
    var lines = text.split('\n');
    if (lines[lines.length - 1].length === 0) {
      // Discard empty last line.
      lines.pop;
    }
    
    return lines;
  }
  
  function validateLines(lines) {
    lineLength();
    numberOfLines();
    oddLines();
    evenLines();
    
    function lineLength() {
      var lineLength;
      for (var l in lines) {
        if (lineLength) {
          if (lines[l].length !== lineLength) {
            throw 'Line ' + (new Number(l) + 1) + ' (' + lines[l] + ') length is ' + lines[l].length + ' not ' + lineLength;
          }
        } else {
          lineLength = lines[l].length;
        }
      }
    }
    
    function numberOfLines() {
      if (lines.length % 2 === 0) {
        throw 'Expected odd number of lines, not ' + lines.length;
      }
    }
    
    function oddLines() {
      var regexp = /^[ |A-Z]{3}( [ |A-Z]{3})*$/;

      for (var l = 0; l < lines.length; l += 2) {
        if (!regexp.test(lines[l])) {
          throw 'Format of station names line ' + (new Number(l) + 1) + ' (' + lines[l] + ') incorrect';
        }
      }
    }
    
    function evenLines() {
      var regexp = /^ [ |\|] ([ |ʅ|ʃ|u|n] [ |\|] )*$/;

      for (var l = 1; l < lines.length; l += 2) {
        if (!regexp.test(lines[l])) {
          throw 'Format of track joining line ' + (new Number(l) + 1) + ' (' + lines[l] + ') incorrect';
        }
      }
    }
  }
  
  function createGrid(lines) {
    var grid = [];

    // Stations.
    // We've already performed validation on the lines, so we can make
    // all the assumptions we need here.
    for (var l = 0; l < lines.length; l += 2) {
      for (var c = 0; c < gridWidth; c++) {
        var code = lines[l].substr(c * 4, 3);
        if (code !== '   ') {
          var stationInfo = stations[code];
          var name = stationInfo ? stationInfo.name : 'unknown';
          var station = new Station(code, name);
          grid.push(station);
        } else {
          grid.push(null);
        }
      }
    }
    
    var join;
    // Vertical track joins.
    for (var l = 1; l < lines.length; l += 2) {
      for (var c = 0; c < gridWidth; c++) {
        join = lines[l].substr(c * 4 + 1, 1);
        if (join === '|') {
          var stationAbove = grid[((l - 1) / 2 * gridWidth) + c];
          var stationBelow = grid[((l + 1) / 2 * gridWidth) + c];
          if (!stationAbove || !stationBelow) {
            throw 'Cannot link ' + stationAbove + ' to ' + stationBelow;
          }
          stationAbove.downTo(stationBelow);
        }
      }
    }
    
    // Cross-verticals track joins.
    for (var l = 1; l < lines.length; l += 2) {
      for (var c = 0; c < gridWidth - 1; c++) {
        join = lines[l].substr(c * 4 + 3, 1);
        switch (join) {
        case 'ʅ':
          var stationLeftAbove = grid[((l - 1) / 2 * gridWidth) + c];
          var stationRightBelow = grid[((l + 1) / 2 * gridWidth) + c + 1];
          if (!stationLeftAbove || !stationRightBelow) {
            throw 'Cannot link ' + stationLeftAbove + ' to ' + stationRightBelow;
          }
          stationLeftAbove.downRightTo(stationRightBelow);
          break;
        case 'ʃ':
          var stationRightAbove = grid[((l - 1) / 2 * gridWidth) + c + 1];
          var stationLeftBelow = grid[((l + 1) / 2 * gridWidth) + c];
          if (!stationRightAbove || !stationLeftBelow) {
            throw 'Cannot link ' + stationRightAbove + ' to ' + stationLeftBelow;
          }
          stationRightAbove.downLeftTo(stationLeftBelow);
          break;
        }
      }
    }
    
    return grid;
  }
}
