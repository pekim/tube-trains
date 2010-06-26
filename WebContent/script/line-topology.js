function LineTopology(text) {
  var width;
  var height;
  
  init();
  
  function init() {
    var lines = linesFromText();
    validateLines(lines);
    height = lines.length;
  }
  
  function linesFromText() {
    var lines = text.split('\n');
    if (lines[lines.length - 1].length === 0) {
      // Discard empty last line.
      lines.pop;
    }
    
    return lines;
  }
  
  function validateLines(lines) {
    var lineLength;
    for (var l in lines) {
      if (lineLength) {
        if (lines[l].length !== lineLength) {
          throw 'Line ' + (new Number(l) + 1) + ' length is ' + lines[l].length + ' not ' + lineLength;
        }
      } else {
        lineLength = lines[l].length;
      }
    }
  }
  
  this.width = function () {
    return width;
  };
  
  this.height = function () {
    return height;
  };
}
