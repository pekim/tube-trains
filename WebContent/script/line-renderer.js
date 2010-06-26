const TICKSTYLE = {
    LEFT: 0,
    RIGHT: 1,
    BOTH: 2
};

function LineRenderer(line) {
  const DIRECTION = {
      DOWN:  {radians: 0.0 * Math.PI},      // Base direction.
      LEFT:  {radians: 0.5 * Math.PI},
      UP:    {radians: 1.0 * Math.PI},
      RIGHT: {radians: 1.5 * Math.PI}
  };

  var canvas = $('#tube-line')[0];
  var context = canvas.getContext('2d');
  
  var stationFont = '14px sans-serif';
  var flagBoxFont = 'bold ' + stationFont;
  var xHeight = getXHeight(stationFont);
  var lineWidth = xHeight;                // Equivalent to 'x' in tfl-line-diagram-standard.
  var tickSize = 0.66 * lineWidth;
  var stationSpacing = 8 * xHeight;
  var maximumStationNameWidth = getMaximumStationNameWidth();
  
  var stationColour = 'rgb(0, 24, 168)';
  var flagTextColour = 'rgb(255, 255, 255)';
  
  var topology = new LineTopology(line.topologyText, line.stations);

  this.render = function () {
    drawFlagBox(line.name, 10, 10);
    drawTubeLine(100, 8 * lineWidth);
  };

  function drawTubeLine(lineCentre, yStart) {
    var y = yStart;
    var grid = topology.grid();
    var rows = topology.gridHeight();
    var columns = topology.gridWidth();
    
    for (var row = 0; row < rows; row++) {
      var x = lineCentre;
      for (var column = 0; column < columns; column++) {
        var station = grid[(row * columns) + column];
        console.log(station ? station.code() : '-');
        if (station) {
          drawStation(station, x, y);
        }
        drawLineVertical(x, y, stationSpacing);
        
        x += 200;
      }

      y += stationSpacing;
    }
//    for (var s in line.stations) {
//      var station = line.stations[s];
//      drawStation(station, lineCentre, y);
//      drawLineVertical(lineCentre, y, stationSpacing);
//
//      y += stationSpacing;
//    }
//    
//    drawArrow(DIRECTION.DOWN, lineCentre, y);
  }

  function drawLineVertical(lineCentre, y, height) {
    context.fillStyle = line.colour;  
    context.fillRect(lineCentre - (lineWidth / 2), y, lineWidth, height);
  }

  function drawTick(style, lineCentre, y) {
    context.fillStyle = line.colour;  

    switch (style) {
    case TICKSTYLE.LEFT:
      drawLeftTick(lineCentre, y);
      break;
    case TICKSTYLE.RIGHT:
      drawRightTick(lineCentre, y);
      break;
    case TICKSTYLE.BOTH:
      drawLeftTick(lineCentre, y);
      drawRightTick(lineCentre, y);
      break;
    }
  }
  
  function drawLeftTick(lineCentre, y) {
    context.fillRect(lineCentre - (lineWidth / 2) - tickSize, y, tickSize, tickSize);  
  }
  
  function drawRightTick(lineCentre, y) {
    context.fillRect(lineCentre + (lineWidth / 2), y, tickSize, tickSize);  
  }
  
  function drawDoubleTick(lineCentre, y) {
    drawLeftTick(lineCentre, y);
    drawRightTick(lineCentre, y);
  }
  
  function clear() {
    canvas.width = canvas.width;
  }
  
  function drawStation(station, lineCentre, y) {
//    drawTick(station.tick, lineCentre, y);
    drawTick(TICKSTYLE.RIGHT, lineCentre, y);

    context.fillStyle = stationColour;  
    context.font = stationFont;
    context.textBaseline = 'middle';
    context.fillText(' ' + station.name(), lineCentre + (lineWidth / 2) + tickSize, y + (tickSize / 2));
  }

  /**
   * Draw a continuation arrow on a tube line. 
   * See 'TFL Line Diagram Standard', section 6.
   * 
   * <pre>
   *                     |--s---|
   *     |   |         |   |
   *     | w |         | w |  u
   *     |---|         |---|----|
   *     |   |    .    |   |    . ------
   *     |   |    |\   |   |   /|  |  |
   *     |   |    | \  |   |  / |  |  z        q = the point specified by the function's y argument.
   *     |   |    |  \ |   |t/  |  s  |        s = line width * 2  [ = (w / 2) + u ]
   *     |   |    \   \|   |/   /  | ---       t = 45 degrees
   *     |   |     \ w/\   /   /   |           u = line width * 1.5
   *     |___|      \/  \ /   /   _|____       w = line width
   *                 \   q   /        |        z = sqrt(2 * (w * w))
   *                  \     /         z
   *                   \   /          |
   *                    \ / t         |
   *                 -------------------
   * </pre>
   * 
   * @param direction   the direction of the arrow. One of the DIRECTION constants.
   * @param lineCentre  the (x) centre of the line to which the arrow is to be added.
   * @param y           The (y) position where the point at 'q' in the diagram above will be.
   */
  function drawArrow(direction, lineCentre, y) {
    var z = Math.sqrt(2 * (lineWidth * lineWidth));
    var s = 2 * lineWidth;

    context.save();
    context.translate(lineCentre, y);
    context.rotate(direction.radians);

                                    // The arrow is drawn pointing down, as in the diagram.
    context.moveTo(0, z);           // The tip of the arrow.
    context.lineTo(s, z - s);       // Diagonally up and right.
    context.lineTo(s, -s);          // Straight up.
    context.lineTo(0, 0);           // Diagonally down and left, to point 'q' in the diagram.
    context.lineTo(-s, -s);         // Diagonally up and left.
    context.lineTo(-s, z - s);      // Straight down.
    context.lineTo(0, z);           // Diagonally down and right, back to the tip of the arrow.
    
    context.fillStyle = line.colour;
    context.fill();
    
    context.restore();
  }
  
  function drawFlagBox(text, x, y) {
    var boxWidth = 12 * lineWidth;
    var boxHeight = 3 * lineWidth;
    
    context.fillStyle = line.colour;
    context.fillRect(x, y, boxWidth, boxHeight);  

    context.fillStyle = flagTextColour;  
    context.font = flagBoxFont;
    context.textBaseline = 'middle';
    var textWidth = context.measureText(text).width;
    context.fillText(text, x + ((boxWidth - textWidth) / 2), y + (boxHeight / 2));
  }  

  function getXHeight(font) {
    clear();
    context.font = font;
    context.fillStyle = "black";
    context.textBaseline = 'top';
    context.fillText('x', 2, 2);
    
    var width = context.measureText('x').width;
    var height = 2 * width;
    var imageData = context.getImageData(2, 2, width, height);
    clear();
    
    var yStart, yEnd;
    var pixel = 0;
    for (var y = 0; y < height; y++) {
      for (var x = 0; x < 4 * width; x += 4) {
        if (imageData.data[pixel + 3] != 0) {
          if (!yStart) {
            yStart = y;
          }
          yEnd = y;
        }
        
        pixel += 4;
      }
    }
    
    return yEnd - yStart + 1;
  }
  
  function getMaximumStationNameWidth() {
    var maximumTextWidth = 0;
    
    for (var s in line.stations) {
      var station = line.stations[s];
      var textWidth = context.measureText(station.name).width;
      if (textWidth > maximumTextWidth) {
        maximumTextWidth = textWidth;
      }
    }
    
    return maximumTextWidth;
  }
}
