function LineTopology(text) {
  var gridWidth;
  var gridHeight;
  
  init();
  
  function init() {
    var lines = linesFromText();
    validateLines(lines);
    
    gridWidth = ((lines[0].length / 4) + 1) | 0;
    gridHeight = ((lines.length / 2) + 1) | 0;
  }
  
  this.gridWidth = function () {
    return gridWidth;
  };
  
  this.gridHeight = function () {
    return gridHeight;
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
      var regexp = /^[ |\\|\||\/]{3}( [ |\\|\||\/]{3})*$/;

      for (var l = 1; l < lines.length; l += 2) {
        if (!regexp.test(lines[l])) {
          throw 'Format of track joining line ' + (new Number(l) + 1) + ' (' + lines[l] + ') incorrect';
        }
      }
    }
  }
}
