$(document).ready(function() {
  const TICKSTYLE = {
      LEFT: 0,
      RIGHT: 1,
      BOTH: 2
  };
  
  const DIRECTION = {
      DOWN:  {radians: 0.0 * Math.PI},      // Base direction.
      LEFT:  {radians: 0.5 * Math.PI},
      UP:    {radians: 1.0 * Math.PI},
      RIGHT: {radians: 1.5 * Math.PI}
  };
  
  var stations = [
                  { name: 'Ealing Broadway',
                    tick: TICKSTYLE.BOTH
                  },
                  { name: 'Ealing Common',
                    tick: TICKSTYLE.RIGHT
                  },
                  { name: 'Acton Town',
                    tick: TICKSTYLE.RIGHT
                  },
                  { name: 'Chiswick Park',
                    tick: TICKSTYLE.RIGHT
                  },
                  { name: 'Turnham Green',
                    tick: TICKSTYLE.RIGHT
                  },
  ];
  
  var canvas = $('#tube-line')[0];
  var context = canvas.getContext('2d');
  
  var stationFont = '14px sans-serif';
  var flagBoxFont = 'bold ' + stationFont;
  var xHeight = getXHeight(stationFont);
  var lineWidth = xHeight;                // Equivalent to 'x' in tfl-line-diagram-standard.
  var tickSize = 0.66 * lineWidth;
  var stationSpacing = 8 * xHeight;
  
  var lineColour = 'rgb(0, 121, 52)';
  var stationColour = 'rgb(0, 24, 168)';
  var flagTextColour = 'rgb(255, 255, 255)';
  
  drawFlagBox('District', 10, 10);
  drawTubeLine(100, 8 * lineWidth);

  function drawTubeLine(lineCentre, yStart) {
    var y = yStart;
    for (var s in stations) {
      var station = stations[s];
      drawStation(station, lineCentre, y);
      drawLineVertical(lineCentre, y, stationSpacing);

      y += stationSpacing;
    }
    
    drawArrow(DIRECTION.DOWN, lineCentre, y);
  }

  function drawLineVertical(lineCentre, y, height) {
    context.fillStyle = lineColour;  
    context.fillRect(lineCentre - (lineWidth / 2), y, lineWidth, height);
  }

  function drawTick(style, lineCentre, y) {
    context.fillStyle = lineColour;  

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
    drawTick(station.tick, lineCentre, y);

    context.fillStyle = stationColour;  
    context.font = stationFont;
    context.textBaseline = 'middle';
    context.fillText(' ' + station.name, lineCentre + (lineWidth / 2) + tickSize, y + (tickSize / 2));
  }

  /**
   * 
   * See 'TFL Line Diagram Standard', section 6.
   * 
   *                     |--s---|
   *     |   |         |   |
   *     | w |         | w |  u
   *     |---|         |---|----|
   *     |   |    .    |   |    . ------
   *     |   |    |\   |   |   /|  |  |
   *     |   |    | \  |   |  / |  |  z
   *     |   |    |  \ |   |t/  |  s  |        s = line width * 2  [ = (w / 2) + u ]
   *     |   |    \   \|   |/   /  | ---       t = 45 degrees
   *     |   |     \ w/\   /   /   |           u = line width * 1.5
   *     |___|      \/  \ /   /   _|____       w = line width
   *                 \       /        |        z = sqrt(2 * (w * w))
   *                  \     /         z
   *                   \   /          |
   *                    \ / t         |
   *                 -------------------   
   */
  function drawArrow(direction, lineCentre, y) {
    var z = Math.sqrt(2 * (lineWidth * lineWidth));
    var s = 2 * lineWidth;

    context.save();
    context.translate(lineCentre, y);
    context.rotate(direction.radians);

    context.moveTo(0, z);
    context.lineTo(s, z - s);
    context.lineTo(s, -s);
    context.lineTo(0, 0);
    context.lineTo(-s, -s);
    context.lineTo(-s, z - s);
    context.lineTo(0, z);
    
    context.fillStyle = lineColour;
    context.fill();
    
    context.restore();
  }
  
  function drawFlagBox(text, x, y) {
    var boxWidth = 12 * lineWidth;
    var boxHeight = 3 * lineWidth;
    
    context.fillStyle = lineColour;
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
});
