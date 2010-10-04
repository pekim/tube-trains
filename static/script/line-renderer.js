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
  
  var stationFont = '12px sans-serif';
  var flagBoxFont = 'bold ' + stationFont;
  var xHeight = getXHeight(stationFont);
  xHeight = ((xHeight + 1) / 2) * 2;      // Ensure even (rounding up if necessary), to avoid
                                          // fuzziness when rendering centred lines.
  var lineWidth = xHeight;                // Equivalent to 'x' in tfl-line-diagram-standard.
  var tickSize = Math.round(0.66 * lineWidth);  // Ensure integer, to avoid fuzziness when rendering.
  var stationSpacing = 8 * xHeight;
  var interstation = stationSpacing + tickSize;
  var maximumStationNameWidth = getMaximumStationNameWidth();
  var trackSeparation = (4 * lineWidth) + maximumStationNameWidth;
  
  var stationColour = 'rgb(0, 24, 168)';
  var flagTextColour = 'rgb(255, 255, 255)';
  
  var topology = new LineTopology(line.topologyText, line.stations);

  this.render = function () {
    drawFlagBox(line.name, 10, 10);
    drawTubeLine(8 * lineWidth, 8 * lineWidth);
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
        if (station) {
          drawStation(station, x, y);
          if (station.downTo()) {
            drawLineVertical(x, y, interstation);
          }
          if (station.downRightTo()) {
            drawLineDownRight(x, y);
          }
          if (station.downLeftTo()) {
            drawLineDownLeft(x, y);
          }
        }
        
        x += trackSeparation;
      }

      y += stationSpacing;
    }
  }

  function strokeLine() {
    context.lineWidth = lineWidth;
    context.strokeStyle = line.colour;
    context.stroke();
    
    context.beginPath();
  }

  function drawLineVertical(lineCentre, y, height) {
    context.moveTo(lineCentre, y);
    context.lineTo(lineCentre, y + height);

    strokeLine();
  }

  /**
   * Draw the line from below a station, down and to the right to
   * join to another station.
   * 
   * <pre>
   *   leftLineX
   *   .
   *   .
   *   |                  ---- leftLineTop
   *   |
   *   |                  ---- leftLineBottom
   *   \ a                ---- leftArcX/Y (a)
   *    \---------\       ---- horizontalLineY
   *              b\      ---- rightArcX/Y (b)
   *                |     ---- rightLineTop
   *                |
   *                |     ---- rightLineBottom
   *     .       .  .
   *     .       .  .
   *     .       .  rightLineX
   *     .       .
   *     .       horizontalLineRight
   *     .
   *     horizontalLineLeft
   * </pre>
   * 
   * @param x the x position of the upper (to the left station).
   * @param y the y position of the upper (to the left station).
   */
  function drawLineDownRight(x, y) {
    var leftLineX = x;
    var rightLineX = leftLineX + trackSeparation;
    var horizontalLineY = y + (interstation / 2);
    var radius = 3.5 * lineWidth;
    var leftLineTop = y;
    var leftLineBottom = horizontalLineY - radius + 1;
    var rightLineTop = horizontalLineY + radius - 1;
    var rightLineBottom = y + interstation;
    var horizontalLineLeft = leftLineX + radius - 1;
    var horizontalLineRight = rightLineX - radius + 1;
    var leftArcX = leftLineX + radius;
    var leftArcY = horizontalLineY - radius; 
    var rightArcX = rightLineX - radius;
    var rightArcY = horizontalLineY + radius; 

    context.moveTo(leftLineX, leftLineTop);
    context.lineTo(leftLineX, leftLineBottom);
    strokeLine();

    context.arc(leftArcX, leftArcY, radius, 0.5 * Math.PI, 1.0 * Math.PI, false);
    strokeLine();
    
    context.moveTo(horizontalLineLeft, horizontalLineY);
    context.lineTo(horizontalLineRight, horizontalLineY);
    strokeLine();

    context.arc(rightArcX, rightArcY, radius, 1.5 * Math.PI, 2.0 * Math.PI, false);
    strokeLine();

    context.moveTo(rightLineX, rightLineTop);
    context.lineTo(rightLineX, rightLineBottom);
    strokeLine();
  }

  /**
   * Draw the line from below a station, down and to the left to
   * join to another station.
   * 
   * <pre>
   *   leftLineX
   *   .
   *   .
   *                |     ---- rightLineTop
   *                |
   *                |     ---- rightLineBottom
   *              a /     ---- rightArcX/Y (a)
   *     /---------/      ---- horizontalLineY
   *    /b                ---- leftArcX/Y (b)
   *   |                  ---- leftLineTop
   *   |
   *   |                  ---- leftLineBottom
   *      .       . .
   *      .       . .
   *      .       . rightLineX
   *      .       .
   *      .       horizontalLineRight
   *      .
   *      horizontalLineLeft
   * </pre>
   * 
   * @param x the x position of the upper (to the right station).
   * @param y the y position of the upper (to the right station).
   */
  function drawLineDownLeft(x, y) {
    var rightLineX = x;
    var leftLineX = rightLineX - trackSeparation;
    var horizontalLineY = y + (interstation / 2);
    var radius = 3.5 * lineWidth;
    var rightLineTop = y;
    var rightLineBottom = horizontalLineY - radius + 1;
    var leftLineTop = horizontalLineY + radius - 1;
    var leftLineBottom = y + interstation;
    var horizontalLineLeft = leftLineX + radius - 1;
    var horizontalLineRight = rightLineX - radius + 1;
    var leftArcX = leftLineX + radius;
    var leftArcY = horizontalLineY + radius; 
    var rightArcX = rightLineX - radius;
    var rightArcY = horizontalLineY - radius; 

    context.moveTo(rightLineX, rightLineTop);
    context.lineTo(rightLineX, rightLineBottom);
    strokeLine();

    context.arc(rightArcX, rightArcY, radius, 0.0 * Math.PI, 0.5 * Math.PI, false);
    strokeLine();
    
    context.moveTo(horizontalLineRight, horizontalLineY);
    context.lineTo(horizontalLineLeft, horizontalLineY);
    strokeLine();

    context.arc(leftArcX, leftArcY, radius, 1.0 * Math.PI, 1.5 * Math.PI, false);
    strokeLine();

    context.moveTo(leftLineX, leftLineTop);
    context.lineTo(leftLineX, leftLineBottom);
    strokeLine();
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
    if (station.numberOfAdjacentStations() > 1) {
      drawTick(TICKSTYLE.RIGHT, lineCentre, y);
    } else {
      drawTick(TICKSTYLE.BOTH, lineCentre, y);
    }

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
